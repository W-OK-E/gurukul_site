"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const supabase = supabaseBrowser();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // ✅ fetch user role from DB
      const { data: profile, error: profileError } = await supabase
        .from("users") // your custom users table
        .select("role")
        .eq("id", data.user?.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      if (profile?.role === "student") {
        router.push("/dashboard/student");
      } else if (profile?.role === "instructor") {
        router.push("/dashboard/instructor");
      } else {
        setError("No role assigned. Contact admin.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4 p-6 border rounded">
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#2C497F] text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
