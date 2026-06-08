import { createClient } from "@supabase/supabase-js"

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseurl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.")
}

export const supabase = createClient(supabaseurl, supabaseAnonKey);
