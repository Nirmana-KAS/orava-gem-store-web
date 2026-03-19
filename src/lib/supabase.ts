import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Supabase environment variables are missing.");
}

export const supabaseAdmin = createClient(supabaseUrl ?? "", serviceRoleKey ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});

export async function uploadFile(file: File, bucket: string, path: string): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const { error } = await supabaseAdmin.storage.from(bucket).upload(path, Buffer.from(bytes), {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("Supabase upload error:", error);
    throw new Error("File upload failed");
  }
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) throw error;
  } catch (error) {
    console.error("Supabase delete error:", error);
    throw new Error("File delete failed");
  }
}

