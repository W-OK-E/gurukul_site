"use client";

import { grade3Data } from "@/data/grade-3";
import Accordion from "@/components/Accordion";
import { FaChalkboardTeacher, FaTasks, FaUserFriends, FaClock } from "react-icons/fa";

const whyChooseUs = [
  {
    title: "1-on-1 Master Classes",
    desc: "Personalized sessions tailored to your child's needs.",
    icon: <FaChalkboardTeacher size={30} />,
  },
  {
    title: "Regular Assignments",
    desc: "Reinforce learning with consistent, structured tasks.",
    icon: <FaTasks size={30} />,
  },
  {
    title: "Parents-Teacher Feedback",
    desc: "Keep track of progress with regular feedback sessions.",
    icon: <FaUserFriends size={30} />,
  },
  {
    title: "Self-Paced Learning",
    desc: "Students learn at their own pace for better understanding.",
    icon: <FaClock size={30} />,
  },
];

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
        <button className="mt-4 px-6 py-3 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56]"
        onClick={() => window.location.href = '/booking'}>
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

    <section className="bg-[#bad29f] py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#2c497f] mb-12">
          Why Choose Gurukul for K–12 Learning?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-[#2c497f] mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg text-[#3d2b56] mb-2">{item.title}</h3>
              <p className="text-[#3d2b56]/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center mt-12">
        <button className="px-6 py-3 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56]"
           onClick={() => window.location.href = '/booking'}>
          Book a Free Demo
        </button>
      </section>
    </main>
  );
}
