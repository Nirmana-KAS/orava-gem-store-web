import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { fail, ok } from "@/lib/api";
import { uploadFile } from "@/lib/supabase";
import { generateId } from "@/lib/utils";

const MAX_SIZE = 10 * 1024 * 1024;
const allowed = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

export async function POST(request: NextRequest): Promise<Response> {
  try {
    await auth();
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return fail("File is required", 400);
    if (!allowed.has(file.type)) return fail("Unsupported file type", 400);
    if (file.size > MAX_SIZE) return fail("File too large", 400);
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${new Date().getFullYear()}/${generateId()}.${ext}`;
    const url = await uploadFile(file, "orava-attachments", path);
    return ok({ url, path }, "File uploaded", 201);
  } catch (error) {
    console.error("File upload error:", error);
    return fail("Failed to upload file", 500);
  }
}

