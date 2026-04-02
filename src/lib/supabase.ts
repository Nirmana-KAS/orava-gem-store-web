import { createClient } from "@supabase/supabase-js";

export const ATTACHMENTS_BUCKET = "orava-attachments";

let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables are missing.");
  }
  _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _supabaseAdmin;
}

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return (getSupabaseAdmin() as unknown as Record<string, unknown>)[prop as string];
  },
});

export async function uploadFile(file: File, bucket: string, path: string): Promise<string> {
  try {
    const targetBucket = bucket || ATTACHMENTS_BUCKET;
    const bytes = await file.arrayBuffer();
    const { error } = await supabaseAdmin.storage.from(targetBucket).upload(path, Buffer.from(bytes), {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabaseAdmin.storage.from(targetBucket).getPublicUrl(path);
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

