import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function keepOnly3() {
  console.log('🗑️  Removing posts 4 and 5, keeping only 3 posts...\n');

  // Delete posts with sort_order > 3
  const { error } = await supabase
    .from('instagram_posts')
    .delete()
    .gt('sort_order', 3);

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Done! Now showing only 3 Instagram posts.');
    console.log('   Visit http://localhost:3001 to see the updated feed.');
  }
}

keepOnly3();
