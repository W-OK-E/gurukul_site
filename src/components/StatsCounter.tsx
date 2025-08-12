"use client";
import { useEffect, useState } from "react";

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#EDA35A]">{count}+</p>
      <p className="text-gray-700">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-[#E1E9C9] py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Counter target={1200} label="Active Students" />
        <Counter target={85} label="Expert Tutors" />
        <Counter target={50} label="Courses Offered" />
      </div>
    </section>
  );
}
