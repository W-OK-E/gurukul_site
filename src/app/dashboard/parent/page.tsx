// src/app/dashboard/parent/page.tsx
import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabaseServer";

const supa = supabaseServer();

export default async function ParentDashboard() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = await prisma.user.findUnique({
    where: { externalId: session?.user.id },
    include: {
      parentKids: {
        include: {
          enrollments: { include: { course: true, instructor: { include: { user: true } } } }
        }
      }
    }
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Your Kids</h2>
      {user?.parentKids.map(kid => (
        <div key={kid.id} className="mt-4 border rounded p-3">
          <p className="font-bold">{kid.fullName} ({kid.grade})</p>
          <ul className="ml-4 mt-2 list-disc">
            {kid.enrollments.map(e => (
              <li key={e.id}>
                {e.course.title} with {e.instructor.user.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
