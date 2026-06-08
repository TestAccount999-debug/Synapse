import { createClient } from "@supabase/supabase-js"

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("Supabase URL defined at load time:", !!supabaseurl, supabaseurl ? supabaseurl.substring(0, 15) : "none");
console.log("Supabase Anon Key defined at load time:", !!supabaseAnonKey);

let supabaseClient: any = null;

export const supabase = new Proxy({} as any, {
    get(target, prop) {
        if (!supabaseClient) {
            console.log("Supabase URL at client access:", !!supabaseurl, supabaseurl ? supabaseurl.substring(0, 15) : "none");
            console.log("Supabase Anon Key at client access:", !!supabaseAnonKey);
            if (!supabaseurl || !supabaseAnonKey) {
                throw new Error("Missing Supabase environment variables.")
            }
            supabaseClient = createClient(supabaseurl, supabaseAnonKey);
        }
        return supabaseClient[prop];
    }
});
