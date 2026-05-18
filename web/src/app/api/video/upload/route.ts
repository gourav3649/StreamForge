import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/lib/ecs-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// App Router route segment config — disables body size limit for large video uploads
export const dynamic = "force-dynamic";

export const maxDuration = 300; // 5 minutes max for large video uploads

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const filename = formData.get("filename") as string | null;

    if (!file || !filename) {
      return NextResponse.json(
        { error: "Missing file or filename" },
        { status: 400 }
      );
    }

    // Sanitize filename — replace spaces with underscores to avoid S3 key encoding issues
    const safeFilename = filename.replace(/\s+/g, "_");
    console.log(`[upload] Uploading: ${safeFilename} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${process.env.VIDEO_UPLOAD_KEY}/${safeFilename}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.VIDEO_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const s3Url = `https://${process.env.VIDEO_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log(`[upload] Success: ${s3Url}`);

    return NextResponse.json({
      message: "Upload successful",
      url: s3Url,
      filename,
    });
  } catch (error: any) {
    console.error("[upload] Error:", error?.message || error);
    return NextResponse.json(
      { error: "Upload failed", detail: error?.message },
      { status: 500 }
    );
  }
}
