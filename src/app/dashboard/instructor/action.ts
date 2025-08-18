// app/dashboard/(instructor)/actions.ts
"use server";
import { prisma } from "@/lib/prisma";

export async function createAssignment({
  courseId, title, description, resources
}: {
  courseId: string; title: string; description?: string;
  resources?: { type: "file" | "link"; path?: string; url?: string }[];
}) {
  return prisma.assignment.create({
    data: { courseId, title, description, resources }
  });
}
