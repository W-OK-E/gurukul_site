import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";


// TODO: Fix the await function with appropriate requirements
export default async function StudentDashboard() {
  const supabase = supabaseServer(); // <- cookies() called here per request
  console.log("Supabase client:", supabase);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "student") {
    redirect("/dashboard/instructor");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome Student!</h1>
    </div>
  );
}
