// app/dashboard/page.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <a href="/auth">Sign in</a>;

  // Find role in Prisma
  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
  if (!dbUser) return <a href="/auth">Complete sign-in</a>;

  switch (dbUser.role) {
    case "PARENT":      return <ParentDashboard userId={dbUser.id} />;
    case "INSTRUCTOR":  return <InstructorDashboard userId={dbUser.id} />;
    case "STUDENT":     return <StudentDashboard userId={dbUser.id} />;
    case "ADMIN":       return <AdminDashboard />;
    default:            return <div>Role not set</div>;
  }
}

// (You can split ParentDashboard/InstructorDashboard/StudentDashboard into separate server components)
