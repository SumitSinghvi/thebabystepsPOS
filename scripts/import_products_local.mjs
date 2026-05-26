import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const PHOTOS_DIR = "C:\\Users\\Sumit singhvi\\Downloads\\photos\\activity";
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'product-images');

async function main() {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  }

  const files = fs.readdirSync(PHOTOS_DIR);

  for (const file of files) {
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue;

    console.log(`Processing ${file}...`);
    const sourcePath = path.join(PHOTOS_DIR, file);
    const destName = `${Date.now()}-${file.replace(/\s+/g, '-')}`;
    const destPath = path.join(PUBLIC_IMAGES_DIR, destName);
    
    // Copy file to public/product-images
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied to ${destPath}`);

    const ext = path.extname(file);
    const productName = path.basename(file, ext);
    
    const imageUrl = `/product-images/${destName}`;
    
    console.log(`Inserting product ${productName}...`);
    const { error: dbError } = await supabase.from('products').insert({
      name: productName,
      category: 'general',
      price_per_unit: 0,
      unit: 'piece',
      image_url: imageUrl
    });

    if (dbError) {
      console.error(`Failed to insert product ${productName}:`, dbError);
    } else {
      console.log(`Successfully added ${productName}`);
    }
  }

  console.log("Done!");
}

main().catch(console.error);
