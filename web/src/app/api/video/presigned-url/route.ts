import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/lib/ecs-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { filename, fileType } = await req.json();

    if (!filename || !fileType) {
      return NextResponse.json({ error: "Missing filename or fileType" }, { status: 400 });
    }

    const safeFilename = filename.replace(/\s+/g, "_");
    const key = `${process.env.VIDEO_UPLOAD_KEY}/${Date.now()}_${safeFilename}`;
    const bucket = process.env.VIDEO_BUCKET;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType,
    });

    // Generate a presigned URL that expires in 15 minutes
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    const region = process.env.S3_REGION || process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1";
    const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({
      uploadUrl: signedUrl,
      publicUrl,
      key,
    });
  } catch (error: any) {
    console.error("[presigned-url] Error:", error?.message || error);
    return NextResponse.json({ error: "Failed to generate presigned URL" }, { status: 500 });
  }
}
