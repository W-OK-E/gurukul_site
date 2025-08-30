// create_user.ts
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Loaded' : '❌ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Loaded' : '❌ Missing');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;



// Validate environment variables
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing from environment variables');
  console.error('Make sure your .env.local file contains:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is missing from environment variables');
  console.error('Make sure your .env.local file contains:');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Utility to generate random credentials ---
function generateCredentials(role: 'student' | 'instructor') {
  const uuid = randomUUID().split('-')[0]; // Short unique ID
  const email = `${role}_${uuid}@demo.com`;
  const password = `TempPass_${uuid}`; // Temporary password

  return { email, password };
}

async function createUser({
  fullName,
  userType,
  phone,
}: {
  fullName: string;
  userType: 'student' | 'instructor';
  phone?: string;
}) {
  try {
    const { email, password } = generateCredentials(userType);

    console.log(`\n🚀 Creating ${userType}: ${fullName}`);
    
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skip email confirmation
      user_metadata: {
        full_name: fullName,
        user_type: userType,
        phone,
      },
    });

    if (authError) {
      console.error('❌ Auth creation error:', authError.message);
      return;
    }

    const userId = authData.user?.id;

    if (!userId) {
      console.error('❌ Failed to get user ID from auth creation');
      return;
    }

    // 2. Insert profile into "users" table
    const { error: profileError } = await supabase.from('users').insert({
      id: userId,
      email,
      full_name: fullName,
      user_type: userType,
      phone,
    });

    if (profileError) {
      console.error('❌ Failed to create user profile:', profileError.message);
      return;
    }

    console.log('✅ User created successfully!');
    console.log('🔐 Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   User ID: ${userId}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Example usage:
async function main() {
  await createUser({
    fullName: 'John Doe',
    userType: 'student',
    phone: '9876543210',
  });
  
  // Create an instructor too
  await createUser({
    fullName: 'Jane Smith',
    userType: 'instructor',
    phone: '9123456789',
  });
}

// Run the script
main().catch(console.error);