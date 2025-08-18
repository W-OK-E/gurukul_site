// components/ClassTracker.tsx
import { prisma } from "@/lib/prisma";
export default async function ClassTracker({ kidId }: { kidId: string }) {
  const sessions = await prisma.classSession.findMany({
    where: { enrollment: { kidId } },
    orderBy: { scheduledAt: "asc" }
  });
  const completed = sessions.filter(s => s.status === "completed").length;

  return (
    <div className="border rounded p-4">
      <div className="font-semibold mb-2">Class Tracker</div>
      <div className="text-sm mb-2">Classes completed: {completed} / {sessions.length}</div>
      <ul className="space-y-1 text-sm">
        {sessions.map(s => (
          <li key={s.id}>
            {new Date(s.scheduledAt).toLocaleString()} — {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
