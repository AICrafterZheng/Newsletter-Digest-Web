import dotenv from 'dotenv';

dotenv.config();

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    table: process.env.SUPABASE_TABLE,
  },
  server: {
    port: process.env.PORT || 3000,
  },
}; 