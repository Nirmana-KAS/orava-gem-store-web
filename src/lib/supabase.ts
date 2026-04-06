import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase environment variables missing");
  }
  return createClient(url, key);
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase admin environment variables missing");
  }
  return createClient(url, key);
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof ReturnType<typeof createClient>];
  },
});

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return getSupabaseAdmin()[prop as keyof ReturnType<typeof createClient>];
  },
});

export async function uploadFile(
  file: File,
  bucket: string = "orava-attachments",
  path: string,
): Promise<string> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw error;
  const { data: urlData } = admin.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteFile(
  bucket: string = "orava-attachments",
  path: string,
): Promise<void> {
  const admin = getSupabaseAdmin();
  const { error } = await admin.storage.from(bucket).remove([path]);
  if (error) throw error;
}
