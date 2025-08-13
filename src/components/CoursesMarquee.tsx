"use client";
import Marquee from "react-fast-marquee";

export default function CoursesMarquee() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <Marquee gradient={false} speed={50} className="text-white text-2xl font-semibold" style={{textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'}}>
        Mathematics • Physics • Chemistry • Biology • Coding • SAT Prep • English • History • Economics •
      </Marquee>
    </section>
  );
}