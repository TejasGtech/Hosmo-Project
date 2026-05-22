import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js"; //Import Supabase Client
//Get supabase URL & KEY from .env file(for security reason)
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URI;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

//export supabase URL & KEY
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
