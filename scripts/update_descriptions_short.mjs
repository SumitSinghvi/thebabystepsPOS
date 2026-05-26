import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const shortDescriptions = {
  "Castle Slide": "Indoor Slide",
  "Baby Slide Senior": "Kids Slide",
  "Zoom Chair  H-38.5(cm)": "H-38.5 cm",
  "Square Table": "Square Table",
  "Soft Blocks(12pcs set)": "12pcs set",
  "Scoot Hoot": "Ride-On Toy",
  "Rectangle Table": "Rectangle Table",
  "Play junction": "Play Station",
  "Plastic Chair  H-12": "H-12 inch",
  "Baby Bear Zone Beige": "Play Pen",
  "Plastic Ball": "100pcs set",
  "My Play Table": "Activity Table",
  "My Big Car": "Ride-On Car",
  "Moon Piece Table": "Modular Table",
  "Magic Car Train": "Ride-On Train",
  "Jumbo Playstation": "Large Playground",
  "High Density PU Foam cubes": "L6\"*W6\"*H6\"",
  "Duck Rocker": "Kids Rocker",
  "Dolphin Swing Car": "Swing Car",
  "Classic Play Castle": "Play Castle",
  "Baby Bear Zone Multicolor": "Play Pen",
  "Adjustable Chair  H-26(cm)": "H-26 cm",
  "6 in 1 Block Table": "Activity Table",
  "3 Way Pony Rocker": "Multi-Seat Rocker",
  "3 Way Elephant Rocker": "Multi-Seat Rocker"
};

async function main() {
  const { data: products, error: fetchError } = await supabase.from('products').select('*');
  if (fetchError) {
    console.error('Failed to fetch products', fetchError);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    const desc = shortDescriptions[product.name];
    if (desc) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ description: desc })
        .eq('id', product.id);
      
      if (updateError) {
        console.error(`Failed to update description for ${product.name}:`, updateError);
      } else {
        console.log(`Updated ${product.name} -> ${desc}`);
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} product descriptions.`);
}

main().catch(console.error);
