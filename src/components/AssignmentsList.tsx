// components/AssignmentsList.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AssignmentsList({ courseId, kidId }:{
  courseId: string; kidId: string;
}) {
  const assignments = await prisma.assignment.findMany({
    where: { courseId },
    include: { submissions: { where: { kidId } } },
    orderBy: { createdAt: "desc" }
  });

return (
  <div className="space-y-4">
    {assignments.length === 0 ? (
      <p className="text-gray-500 text-sm">No assignments yet.</p>
    ) : (
      assignments.map(a => {
        const submission = a.submissions[0];
        const status = submission
          ? submission.grade ? "Graded" : "Submitted"
          : "Pending";

        return (
          <div key={a.id} className="border rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{a.title}</h4>
                {a.description && <p className="text-sm text-gray-600">{a.description}</p>}
                <p className="text-xs text-gray-500">
                  Created on {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                status === "Graded"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Submitted"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {status}
              </span>
            </div>

            {Array.isArray(a.resources) && a.resources.length > 0 && (
              <ul className="mt-2 text-sm list-disc list-inside">
                {a.resources.map((r:any, i:number) => (
                  <li key={i}>
                    {r.type === "link" && (
                      <a className="underline hover:text-blue-600" href={r.url} target="_blank">
                        Resource Link
                      </a>
                    )}
                    {r.type === "file" && (
                      <Link href={`/api/files/${encodeURIComponent(r.path)}`}>
                        Download File
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3">
              <Link
                href={`/dashboard/assignments/${a.id}/submit?kid=${kidId}`}
                className="text-sm px-3 py-1 bg-[#2C497F] hover:bg-[#1e3560] text-white rounded"
              >
                {submission ? "Resubmit" : "Submit"}
              </Link>
            </div>
          </div>
        );
      })
    )}
  </div>)
};
