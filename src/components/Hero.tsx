"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#CADCAE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-16">
        
        {/* Left Column */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            World Class Tutors <br /> from the comfort of your home! 
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Get the academic edge you need! Join our courses today!
          </p>

          {/* Features */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <span className="flex items-center gap-2 text-[#EDA35A]">
              ✅ One-on-One Session
            </span>
            <span className="flex items-center gap-2 text-[#EDA35A]">
              📝 Regular Assignments
            </span>
            <span className="flex items-center gap-2 text-[#EDA35A]">
              🌎 All International Curriculum
            </span>
          </div>

          {/* CTA Button */}
          <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
            Schedule your Demo Now!
          </button>
        </div>

        {/* Right Column */}
        <div className="relative mt-10 md:mt-0">
          {/* Shape Background */}
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#E1E9C9] rounded-full -z-10"></div>

          {/* Tutor Image */}
          <Image
            src="/tutor.png"
            alt="Tutor"
            width={400}
            height={400}
            className="rounded-lg relative z-10"
          />

          {/* Badge */}
          <div className="absolute top-4 right-4 bg-white shadow-md px-4 py-2 rounded-lg font-bold text-[#EDA35A]">
            10+ Curriculums
          </div>
        </div>
      </div>

      {/* Decorative Dots */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <svg width="120" height="60">
          {[...Array(5)].map((_, row) =>
            [...Array(10)].map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 12}
                cy={row * 12}
                r="2"
                fill="#EDA35A"
              />
            ))
          )}
        </svg>
      </div>
    </section>
  );
}
