// src/app/dashboard/layout.tsx
import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { externalId: session.user.id },
    include: {
      parentKids: true,
      studentKid: true,
      instructor: true,
    },
  });

  if (!user) redirect("/onboarding");

  return (
    <div className="p-6">
      <header className="mb-6 border-b pb-4 flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="text-sm text-gray-600">{user.name} ({user.role})</span>
      </header>
      {children}
    </div>
  );
}
