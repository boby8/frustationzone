import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = "https://ixukpbbeebnoonaurjgo.supabase.co";
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dWtwYmJlZWJub29uYXVyamdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzQwOTMsImV4cCI6MjA3NDQ1MDA5M30.EylP_add6arQ3_AtSxJzOQ58JQZI8iX2j3PZYP7CFyU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
