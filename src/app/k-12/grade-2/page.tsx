import { grade3Data } from "@/data/grade-3";
import Accordion from "@/components/Accordion";

export default function Grade3Page() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          World-Class 1-on-1 Grade 3 Tutoring From the Comfort of Your Home
        </h1>
        <p className="text-lg text-gray-600">
          Unlock your child's potential with expert-led classes tailored for Grade 3.
        </p>
        <button className="mt-4 px-6 py-3 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56]">
          Book Free Demo
        </button>
      </section>

      {/* Subjects Accordion */}
      <section className="space-y-6">
        {Object.entries(grade3Data).map(([subject, units]) => (
          <Accordion key={subject} title={subject}>
            {units.map((unit, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center mb-2">
                  <img src={unit.icon} alt="" className="w-8 h-8 mr-3" />
                  <h3 className="text-lg font-semibold">{unit.title}</h3>
                </div>
                <ul className="text-gray-600 space-y-1">
                  {unit.topics.map((topic, t) => (
                    <li key={t}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Accordion>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
        {["1-on-1 Master Classes", "Regular Assignments", "Parent Feedback Sessions", "Self-Paced Learning"].map((point, i) => (
          <div key={i} className="bg-[#CCF5AC] rounded-lg p-6 text-center font-semibold">
            {point}
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="text-center mt-12">
        <button className="px-6 py-3 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56]">
          Book a Free Demo
        </button>
      </section>
    </main>
  );
}
