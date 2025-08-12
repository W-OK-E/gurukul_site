"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#CADCAE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-20">
        {/* Left */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            World-Class Tutors <br /> At Your Fingertips
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Learn from the best educators across the globe with personalized
            learning experiences.
          </p>
          <button className="mt-6 bg-[#EDA35A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500">
            Get Started
          </button>
        </div>

        {/* Right */}
        <div className="relative mt-10 md:mt-0">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#E1E9C9] rounded-full -z-10"></div>
          <Image
            src="/tutor.png"
            alt="Tutor"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
