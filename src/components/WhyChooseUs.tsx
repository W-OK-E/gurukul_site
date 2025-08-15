"use client";
import { FaUserGraduate, FaBookOpen, FaGlobe, FaChalkboardTeacher } from "react-icons/fa";

const points = [
  { icon: <FaUserGraduate size={40} />, title: "Personalized Tutoring", desc: "Tailored lessons to match each student's pace and style." },
  { icon: <FaBookOpen size={40} />, title: "Comprehensive Curriculum", desc: "Covering all grades, subjects, and competitive exams." },
  { icon: <FaGlobe size={40} />, title: "Global Expert Tutors", desc: "Learn from the best teachers across the globe." },
  { icon: <FaChalkboardTeacher size={40} />, title: "Interactive Learning", desc: "Engaging online classes with advanced tech tools." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-[#ccf5ac]">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gurukul?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {points.map((point, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <div className="text-[#2c497f] mb-4">{point.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
            <p className="text-gray-600">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
