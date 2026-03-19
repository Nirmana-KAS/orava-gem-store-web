import { NextRequest } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { fail, ok, requireAdmin } from "@/lib/api";

const MAX_SIZE = 10 * 1024 * 1024;
const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return fail("File is required", 400);
    if (!allowed.has(file.type)) return fail("Unsupported image type", 400);
    if (file.size > MAX_SIZE) return fail("File too large", 400);
    const url = await uploadImage(file, "orava-products");
    return ok({ url }, "Image uploaded", 201);
  } catch (error) {
    console.error("Image upload error:", error);
    return fail("Failed to upload image", 500);
  }
}

