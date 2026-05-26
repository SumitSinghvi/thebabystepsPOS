import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const descriptions = {
  "Castle Slide": "Let your little ones experience a royal adventure with this vibrant and safe castle slide. Perfect for indoor and outdoor play areas.",
  "Baby Slide Senior": "A premium quality, sturdy slide designed for older toddlers. Ensures hours of active fun while promoting physical development.",
  "Zoom Chair  H-38.5(cm)": "Ergonomic and durable zoom chair with a height of 38.5cm. Designed for maximum comfort and perfect for classroom setups.",
  "Square Table": "A versatile and sturdy square table. Ideal for group activities, arts and crafts, or study time in classrooms and playrooms.",
  "Soft Blocks(12pcs set)": "A set of 12 colorful soft blocks designed for safe and imaginative play. Helps improve motor skills and creativity in early learners.",
  "Scoot Hoot": "A fun and engaging ride-on toy that encourages balance and coordination. Features a cute design that kids will absolutely love.",
  "Rectangle Table": "Spacious and durable rectangular table perfect for collaborative learning and group activities in preschools or daycares.",
  "Play junction": "An exciting play junction designed to keep multiple kids engaged. Encourages social interaction and cooperative play.",
  "Plastic Chair  H-12": "Lightweight, durable, and easy-to-clean plastic chair with a height of 12 inches. Sized perfectly for young children.",
  "Baby Bear Zone Beige": "Create a safe and secure play area with the Baby Bear Zone in a stylish beige color. Sturdy, easy to assemble, and spacious.",
  "Plastic Ball": "High-quality, crush-proof plastic balls. Perfect for ball pits, bounce houses, and endless sensory play. 100pcs set.",
  "My Play Table": "The perfect interactive play table for your child's playroom. Sturdy construction suitable for various fun activities.",
  "My Big Car": "A sturdy and spacious ride-on car designed for adventurous kids. Easy to maneuver and built for endless outdoor fun.",
  "Moon Piece Table": "An innovative moon-shaped table that adds a creative touch to any learning environment. Great for modular classroom setups.",
  "Magic Car Train": "All aboard the Magic Car Train! A delightful and interactive ride-on that brings the joy of a train ride right to your home or playground.",
  "Jumbo Playstation": "The ultimate indoor/outdoor playstation featuring multiple activities to keep children entertained, active, and engaged for hours.",
  "High Density PU Foam cubes": "Safe, soft, and durable high-density PU foam cubes. Ideal for sensory play, gymnastics, or building soft structures. L6\"*W6\"*H6\".",
  "Duck Rocker": "A charming and safe duck-themed rocker. Provides smooth rocking motion to help toddlers develop balance and core strength.",
  "Dolphin Swing Car": "No pedals, no gears, no batteries! The Dolphin Swing Car provides an effortless and fun riding experience using natural forces.",
  "Classic Play Castle": "A majestic and spacious classic play castle. Perfect for large play areas, offering endless opportunities for imaginative adventures.",
  "Baby Bear Zone Multicolor": "A bright and vibrant multi-colored playpen. Provides a safe, enclosed environment for babies and toddlers to play freely.",
  "Adjustable Chair  H-26(cm)": "A highly functional adjustable chair that grows with your child. Features a base height of 26cm and ergonomic support.",
  "6 in 1 Block Table": "A versatile 6-in-1 activity table designed for building blocks, learning, and dining. A must-have for creative playrooms.",
  "3 Way Pony Rocker": "A fun and versatile pony rocker that accommodates up to three children at once. Encourages teamwork and shared fun.",
  "3 Way Elephant Rocker": "An adorable elephant-themed rocker designed for up to three riders. Safe, sturdy, and perfect for interactive group play."
};

async function main() {
  const products = JSON.parse(fs.readFileSync('products_dump.json', 'utf8'));
  let updatedCount = 0;

  for (const product of products) {
    const desc = descriptions[product.name];
    if (desc) {
      console.log(`Updating description for ${product.name}...`);
      const { error } = await supabase
        .from('products')
        .update({ description: desc })
        .eq('id', product.id);
      
      if (error) {
        console.error(`Failed to update ${product.name}:`, error);
      } else {
        updatedCount++;
      }
    }
  }
  console.log(`Successfully updated ${updatedCount} products.`);
}

main().catch(console.error);
