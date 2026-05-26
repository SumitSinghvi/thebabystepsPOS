import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const dimensionDescriptions = {
  "Castle Slide": "L180 x W90 x H110 cm",
  "Baby Slide Senior": "L160 x W80 x H105 cm",
  "Square Table": "L60 x W60 x H50 cm",
  "Rectangle Table": "L120 x W60 x H50 cm",
  "Scoot Hoot": "L60 x W30 x H45 cm",
  "Play junction": "L200 x W200 x H150 cm",
  "My Play Table": "L80 x W80 x H50 cm",
  "My Big Car": "L80 x W40 x H45 cm",
  "Moon Piece Table": "L120 x W60 x H50 cm",
  "Magic Car Train": "L90 x W40 x H50 cm",
  "Jumbo Playstation": "L300 x W300 x H250 cm",
  "Duck Rocker": "L70 x W30 x H45 cm",
  "Dolphin Swing Car": "L80 x W30 x H40 cm",
  "Classic Play Castle": "L250 x W250 x H200 cm",
  "Baby Bear Zone Beige": "L150 x W150 x H60 cm",
  "Baby Bear Zone Multicolor": "L150 x W150 x H60 cm",
  "6 in 1 Block Table": "L60 x W60 x H50 cm",
  "3 Way Pony Rocker": "L100 x W40 x H45 cm",
  "3 Way Elephant Rocker": "L100 x W40 x H45 cm",
  "Zoom Chair  H-38.5(cm)": "H-38.5 cm",
  "Plastic Chair  H-12": "H-12 inch",
  "Adjustable Chair  H-26(cm)": "H-26 cm",
  "High Density PU Foam cubes": "L6\" x W6\" x H6\"",
  "Soft Blocks(12pcs set)": "12pcs set",
  "Plastic Ball": "100pcs set"
};

async function main() {
  const { data: products, error: fetchError } = await supabase.from('products').select('*');
  if (fetchError) {
    console.error('Failed to fetch products', fetchError);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    const desc = dimensionDescriptions[product.name];
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
  
  console.log(`Successfully updated ${updatedCount} product descriptions to include dimensions.`);
}

main().catch(console.error);
