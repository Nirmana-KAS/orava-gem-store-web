import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(
  file: string | File,
  folder: string = "orava-gems",
): Promise<string> {
  let uploadSource: string;

  if (file instanceof File) {
    // Convert File to data URI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    uploadSource = `data:${file.type};base64,${buffer.toString("base64")}`;
  } else {
    // Assume it's a file path or data URI
    uploadSource = file;
  }

  const result = await cloudinary.uploader.upload(uploadSource, {
    folder,
    upload_preset: "orava-products",
    resource_type: "image",
  });
  return result.secure_url;
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
