// debug_env.js
console.log('Testing environment variable loading...');
console.log('Current working directory:', process.cwd());

// Method 1: Try without dotenv
console.log('\n=== Without dotenv ===');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

// Method 2: Try with dotenv
console.log('\n=== With dotenv ===');
require('dotenv').config({ path: '.env.local' });
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Found' : 'Missing');

// Method 3: List all env variables starting with NEXT_ or SUPABASE_
console.log('\n=== All relevant env vars ===');
Object.keys(process.env)
  .filter(key => key.startsWith('NEXT_') || key.startsWith('SUPABASE_'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key] ? 'Found' : 'Missing'}`);
  });

// Method 4: Check file existence
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
console.log('\n=== File check ===');
console.log('Looking for .env.local at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('File content length:', content.length);
  console.log('First 100 characters:', content.substring(0, 100));
}