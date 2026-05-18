import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/lib/ecs-client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.VIDEO_BUCKET,
      Key: key,
    });

    // Presigned URL valid for 1 hour
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("[presigned-get] Error:", error?.message);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
