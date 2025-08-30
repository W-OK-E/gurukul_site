"use client";
import {points} from "@/data/points";

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 max-w-6xl mx-auto text-center">
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

