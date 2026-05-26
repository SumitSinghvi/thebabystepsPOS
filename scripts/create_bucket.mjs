import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  await client.connect();
  console.log("Connected to DB");

  try {
    // Try to create the bucket in the storage.buckets table
    await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('product-images', 'product-images', true)
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log("Bucket 'product-images' ensured.");

    // We can also ensure there is a policy for public select and public insert,
    // though for the anon user we might need to insert those into storage.policies, 
    // or we can use the regular pg policies.
    await client.query(`
      CREATE POLICY IF NOT EXISTS "Allow all public access to product-images"
      ON storage.objects FOR ALL
      USING (bucket_id = 'product-images')
      WITH CHECK (bucket_id = 'product-images');
    `);
    console.log("Policy ensured.");

  } catch (err) {
    console.error("Error creating bucket:", err);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
