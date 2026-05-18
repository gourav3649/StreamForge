import { currentUserData } from "@/actions/user-actions";
import redisClient from "@/lib/redis-client";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await currentUserData();

    if (!redisClient) {
      return NextResponse.json(
        { error: "Redis not available", videos: [] },
        { status: 500 }
      );
    }

    if (!user) {
      // Not authenticated — return empty list instead of crashing the page
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const fetchSize = 10;
    let cursor = "0";
    let results = [];

    const reply = await redisClient.scan(
      cursor,
      "MATCH",
      "video:*:status",
      "COUNT",
      fetchSize
    );

    cursor = reply[0];
    const keys = reply[1];

    for (let key of keys) {
      const status = await redisClient.get(key);
      if (status) {
        const parsedStatus = JSON.parse(status);
        if (parsedStatus.userId === user.id) {
          results.push({
            key,
            status: parsedStatus.status,
            userId: parsedStatus.userId,
            video: parsedStatus.video,
          });
        }
      }
    }

    return NextResponse.json({
      message: "Videos Fetched Successfully!",
      videos: results,
    });
  } catch (error) {
    console.error("[redis-video] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", videos: [] },
      { status: 500 }
    );
  }
}
