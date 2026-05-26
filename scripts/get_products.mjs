import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error(error);
  } else {
    fs.writeFileSync('products_dump.json', JSON.stringify(data, null, 2));
    console.log('Saved to products_dump.json');
  }
}

main().catch(console.error);
