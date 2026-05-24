"use server";

import { actionClient } from "@/lib/safe-actions";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import z from "zod";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "diwwfas3p",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const recolorSchema = z.object({
  activeImage: z.string(),
  format: z.string(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const bgRemoval = actionClient
  .schema(recolorSchema)
  .action(async ({ parsedInput: { activeImage, format } }) => {
    const form = activeImage.split(format);
    const pngConvert = form[0] + "png";
    const parts = pngConvert.split("/upload/");
    const removeUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`;

    const secureUrl = removeUrl.replace("http://", "https://");
    return { success: secureUrl };
  });
