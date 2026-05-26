import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const productCategories = {
  "Castle Slide": "Slides",
  "Baby Slide Senior": "Slides",
  "Zoom Chair  H-38.5(cm)": "Furniture",
  "Square Table": "Furniture",
  "Soft Blocks(12pcs set)": "Soft Play",
  "Scoot Hoot": "Ride-On",
  "Rectangle Table": "Furniture",
  "Play junction": "Play Stations",
  "Plastic Chair  H-12": "Furniture",
  "Baby Bear Zone Beige": "Play Zones",
  "Plastic Ball": "Accessories",
  "My Play Table": "Furniture",
  "My Big Car": "Ride-On",
  "Moon Piece Table": "Furniture",
  "Magic Car Train": "Ride-On",
  "Jumbo Playstation": "Play Stations",
  "High Density PU Foam cubes": "Soft Play",
  "Duck Rocker": "Rockers",
  "Dolphin Swing Car": "Ride-On",
  "Classic Play Castle": "Play Stations",
  "Baby Bear Zone Multicolor": "Play Zones",
  "Adjustable Chair  H-26(cm)": "Furniture",
  "6 in 1 Block Table": "Furniture",
  "3 Way Pony Rocker": "Rockers",
  "3 Way Elephant Rocker": "Rockers"
};

async function main() {
  const uniqueCategories = [...new Set(Object.values(productCategories))];
  
  console.log('Unique categories to create/ensure:', uniqueCategories);
  
  // 1. Ensure categories exist in the categories table
  for (const catName of uniqueCategories) {
    const { data: existing } = await supabase.from('categories').select('*').eq('name', catName).single();
    if (!existing) {
      console.log(`Creating category: ${catName}`);
      await supabase.from('categories').insert({ name: catName });
    } else {
      console.log(`Category already exists: ${catName}`);
    }
  }

  // 2. Fetch all products and update their category
  const { data: products, error: fetchError } = await supabase.from('products').select('*');
  if (fetchError) {
    console.error('Failed to fetch products', fetchError);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    const cat = productCategories[product.name];
    if (cat) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ category: cat })
        .eq('id', product.id);
      
      if (updateError) {
        console.error(`Failed to update category for ${product.name}:`, updateError);
      } else {
        console.log(`Updated ${product.name} -> ${cat}`);
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} products with new categories.`);
}

main().catch(console.error);
