// app/auth/page.tsx
"use client";
import { supabaseBrowser } from "@/lib/supabaseclient";

export default function AuthPage() {
  const supabase = supabaseBrowser();

  const signIn = async () => {
    await supabase.auth.signInWithOtp({ email: "parent@example.com" }); // or use magic link
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <button onClick={signIn} className="px-4 py-2 bg-[#2C497F] text-white rounded">
        Send Magic Link
      </button>
    </main>
  );
}
