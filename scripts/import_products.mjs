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

async function main() {
  const files = fs.readdirSync(PHOTOS_DIR);

  for (const file of files) {
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue;

    console.log(`Processing ${file}...`);
    const filePath = path.join(PHOTOS_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);

    const ext = path.extname(file);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    console.log(`Uploading ${fileName}...`);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, fileBuffer, {
        contentType: `image/${ext.replace('.', '')}`,
        upsert: false
      });

    if (uploadError) {
      console.error(`Failed to upload ${file}:`, uploadError);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    const productName = path.basename(file, ext);
    
    console.log(`Inserting product ${productName}...`);
    const { error: dbError } = await supabase.from('products').insert({
      name: productName,
      category: 'general',
      price_per_unit: 0,
      unit: 'piece',
      image_url: urlData.publicUrl
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
