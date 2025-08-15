"use client";
import { useState } from "react";

const testimonials = [
  { name: "Amit Sharma", review: "Gurukul helped my child excel in math!", role: "Parent" },
  { name: "Sara Khan", review: "The AI & ML course was amazing!", role: "Student" },
  { name: "John Mathews", review: "Best tutoring experience ever.", role: "Parent" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 bg-gradient-to-r from-[#2c497f] to-[#3d2b56] text-white text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
      <div className="max-w-xl mx-auto">
        <p className="text-lg italic mb-4">"{testimonials[index].review}"</p>
        <p className="font-semibold">{testimonials[index].name}</p>
        <p className="text-sm">{testimonials[index].role}</p>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={prev} className="px-4 py-2 bg-white text-[#2c497f] rounded">Prev</button>
        <button onClick={next} className="px-4 py-2 bg-white text-[#2c497f] rounded">Next</button>
      </div>
    </section>
  );
}
