import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gkphrpinbypecvjmxuzp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrcGhycGluYnlwZWN2am14dXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0MTU4MTEsImV4cCI6MTk4NTk5MTgxMX0.35qxudzFeLO15O-VWtdjqA3DxyvTaAue864eeLOPsms";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
