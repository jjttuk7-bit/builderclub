import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.SUPABASE_URL?.trim();
// 유저가 실수로 API 엔드포인트(/rest/v1)까지 포함해서 넣은 경우를 대비해 잘라냅니다.
if (supabaseUrl && supabaseUrl.includes("/rest/v1")) {
  supabaseUrl = supabaseUrl.split("/rest/v1")[0];
}
if (supabaseUrl && supabaseUrl.endsWith("/")) {
  supabaseUrl = supabaseUrl.slice(0, -1);
}

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY?.trim();

function isValidUrl(value?: string): value is string {
  try {
    const url = new URL(value || "");
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const supabase: SupabaseClient | null =
  isValidUrl(supabaseUrl) && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
