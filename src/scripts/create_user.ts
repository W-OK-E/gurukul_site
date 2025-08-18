// scripts/seed.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: "/home/w-ok-e/Documents/Gurukul/gurukul_next/.env.local" });
// 🚨 Use your service role key (NOT the anon key)

// 👇 Debug print to check envs
console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) + "...");


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role key
);

async function seed() {
  // Dummy users
  const users = [
    {
      email: "student1@example.com",
      password: "password123",
      role: "student",
    },
    {
      email: "instructor1@example.com",
      password: "password123",
      role: "instructor",
    },
  ];


  for (const u of users) {
    console.log(`➡️ Creating ${u.role} user: ${u.email}`);

    const email = u.email;
    const password = u.password;
    const role = u.role;
    
    const { data: existing, error: fetchError } = await supabase.auth.admin.listUsers();

    const found = existing.users.find((usr) => usr.email === email);

    if (found) {
      console.log(`ℹ️ User already exists in auth: ${email}`);
      // Still ensure they are in public.users
      const { error: dbError } = await supabase
        .from("users")
        .upsert([
          {
            id: found.id,
            email,
            role,
          },
        ]);
      if (dbError) {
        console.error("❌ DB insert error:", dbError.message);
      } else {
        console.log(`✅ Upserted into public.users: ${email} (${role})`);
      }
    } else {
      // Create new auth user if not exists
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (authError) {
        console.error("❌ Auth error:", authError.message);
      } else {
        console.log(`➡️ Created Auth user: ${email}`);

        const { error: dbError } = await supabase
          .from("users")
          .upsert([
            {
              id: authUser.user.id,
              email,
              role,
            },
          ]);

        if (dbError) {
          console.error("❌ DB insert error:", dbError.message);
        } else {
          console.log(`✅ Inserted into public.users: ${email} (${role})`);
        }
      }
    }

  }

  console.log("🎉 Seeding finished!");
}

seed();
