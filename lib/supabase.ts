import { createClient } from "@supabase/supabase-js"

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient: any = null;

export const supabase = new Proxy({} as any, {
    get(target, prop) {
        if (!supabaseClient) {
            if (!supabaseurl || !supabaseAnonKey) {
                throw new Error("Missing Supabase environment variables.")
            }
            supabaseClient = createClient(supabaseurl, supabaseAnonKey);
        }
        return supabaseClient[prop];
    }
});
