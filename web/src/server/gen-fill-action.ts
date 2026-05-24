"use server";

import { actionClient } from "@/lib/safe-actions";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import z from "zod";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "diwwfas3p",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const genFillSchema = z.object({
  activeImage: z.string(),
  aspect: z.string(),
  width: z.string(),
  height: z.string(),
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

export const genFill = actionClient
  .schema(genFillSchema)
  .action(async ({ parsedInput: { activeImage, aspect, width, height } }) => {
    const parts = activeImage.split("/upload/");

    const fillUrl = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w_${width},h_${height}/${parts[1]}`;
    console.log(genFill);

    const secureUrl = fillUrl.replace("http://", "https://");
    return { success: secureUrl };
  });
