import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    redirect("/dashboard/student");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome Instructor!</h1>
    </div>
  );
}
