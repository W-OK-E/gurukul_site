// components/ParentOverview.tsx
import { prisma } from "@/lib/prisma";

export default async function ParentOverview({ userId }: { userId: string }) {
  const kids = await prisma.kid.findMany({
    where: { parentId: userId },
    include: {
      enrollments: {
        include: { instructor: { include: { user: true } }, course: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      {kids.map(kid => (
        <div key={kid.id} className="border rounded p-4">
          <h3 className="font-semibold">{kid.fullName} — {kid.grade}</h3>
          {kid.enrollments.map(en => (
            <div key={en.id} className="mt-2 text-sm">
              <div>Course: {en.course.title}</div>
              <div>Instructor: {en.instructor.user.name || "TBD"}</div>
              <div>Status: {en.status}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
