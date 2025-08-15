import { grade2Data } from "@/data/grade-2";
import ClassUnits from "@/components/ClassUnits";

export default function Grade2Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          World-Class 1-on-1 Grade 2 Tutoring From the Comfort of Your Home
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to the all-in-one solution for your child's tutoring needs.
        </p>
      </section>

      <ClassUnits data={grade2Data} />
    </main>
  );
}
