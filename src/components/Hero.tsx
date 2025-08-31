"use client";

import CoursesMarquee from "./CoursesMarquee";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";


export default function Hero() {
  return (
    <section className="relative items-center justify-center text-center max-w-7xl mx-auto px-6 py-16 min-h-screen">
      {/* Background Video - Fixed to viewport */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover blur-md brightness-75 -z-10"
        autoPlay
        loop
        muted
        playsInline
        id = "bgVideo"
      >
      <source src="/Fade1.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>

      
      {/* Overlay for extra contrast - Fixed to viewport */}
      <div className="fixed inset-0 bg-black/30 -z-10"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-24">
        
        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-white max-w-3xl mb-6 drop-shadow-lg">
          The only tutoring solution you need
        </h1>

        {/* Schedule Demo Button */}
        <Link
          href="/booking"
          className="px-6 py-3 text-lg bg-[#2C497F] text-white rounded-lg shadow-lg transform transition hover:scale-105 hover:bg-[#3D2B56] mb-8"
        >
          Book a Free Demo
        </Link>

        {/* Courses Marquee */}
        <div className="w-full">
          <CoursesMarquee />
        </div>
        
         <h2 className="text-2xl font-bold text-white mb-8">
        A Simple 5 Step Process for{" "}
        <TypeAnimation
          sequence={[
            "Better Grades", 2000,
            "Better Learning", 2000,
            "Strong Fundamentals", 2000,
            "Happy Learning", 2000,
          ]}
          wrapper="span"
          speed={50}
          deletionSpeed={30}
          repeat={Infinity}
          className="text-[#EDA35A]"
        />
      </h2>

        <Link
          href="#journey"
          className="px-6 py-3 text-lg bg-[#2C497F] text-white rounded-lg shadow-lg transform transition hover:scale-105 hover:bg-[#3D2B56] mb-8"
        >
          Your Learning Journey
        </Link>

        {/* Floating EdTech Doodles - Below the button */}
        <div className="relative w-full h-32 overflow-hidden pointer-events-none mt-4">
          {/* Book Icon - Top Left */}
          <div className="absolute top-20 left-10 animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EDA35A" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>

          {/* Lightbulb Icon - Top Right */}
          <div className="absolute top-20 right-16 animate-pulse opacity-50" style={{ animationDelay: '1s' }}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M9 21h6"/>
              <path d="M9 18h6"/>
              <circle cx="12" cy="9" r="7"/>
            </svg>
          </div>

          {/* Calculator Icon - Middle Left */}
          <div className="absolute top-16 left-50 animate-bounce opacity-40" style={{ animationDelay: '2s', animationDuration: '4s' }}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="#EDA35A" stroke="#EDA35A" strokeWidth="1">
              <rect x="4" y="2" width="16" height="20" rx="2"/>
              <line x1="8" y1="6" x2="16" y2="6"/>
              <line x1="8" y1="10" x2="16" y2="10"/>
              <line x1="8" y1="14" x2="16" y2="14"/>
              <line x1="8" y1="18" x2="16" y2="18"/>
            </svg>
          </div>

          {/* Graduation Cap Icon - Bottom Right */}
          <div className="absolute top-10 right-8 animate-bounce opacity-50" style={{ animationDelay: '3s', animationDuration: '2.5s' }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>

          {/* Globe/Internet Icon - Middle Right */}
          <div className="absolute top-15 left-100 animate-pulse opacity-45" style={{ animationDelay: '4s' }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#EDA35A" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>

          {/* Atom/Science Icon - Top Center */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 animate-spin opacity-30" style={{ animationDuration: '8s' }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
              <circle cx="12" cy="12" r="1"/>
              <path d="M12 2v20"/>
              <path d="M2 12h20"/>
              <path d="M4.93 4.93l14.14 14.14"/>
              <path d="M4.93 19.07l14.14-14.14"/>
            </svg>
          </div>

          {/* Pencil Icon - Left Side */}
          <div className="absolute top-12 left-180 animate-bounce opacity-55" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EDA35A" strokeWidth="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>

          {/* Computer/Laptop Icon - Bottom Left */}
          <div className="absolute top-14 left-200 animate-pulse opacity-40" style={{ animationDelay: '2.5s' }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>

          {/* Star/Achievement Icon - Middle */}
          <div className="absolute top-17 left-220 animate-ping opacity-25" style={{ animationDelay: '3.5s' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#EDA35A" stroke="#EDA35A" strokeWidth="1">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          </div>

          {/* Puzzle Piece - Bottom Center */}
          <div className="absolute top-16 left-70 animate-bounce opacity-35" style={{ animationDelay: '4.5s', animationDuration: '4s' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M19.439 7.85c-.049.322-.059.648-.026.975.056.534-.325.974-.86.974H16a2 2 0 0 1-2-2v-1.539c0-.535-.44-.916-.974-.86a6.97 6.97 0 0 1-.975.026C9.801 4.95 8.5 3.5 8.5 3.5S7.05 4.801 4.85 7.049c-.322.049-.648.059-.975.026C3.34 7.02 2.9 7.44 2.9 7.975V10a2 2 0 0 0 2 2h1.539c.535 0 .916.44.86.974-.033.327-.023.653.026.975C7.801 15.199 9.5 16.5 9.5 16.5s1.301 1.199 3.549 3.439c.322-.049.648-.059.975-.026.534.056.974-.325.974-.86V17a2 2 0 0 1 2-2h1.539c.535 0 .916-.44.86-.974-.033-.327-.023-.653.026-.975C20.199 11.801 21.5 10.5 21.5 10.5s-1.301-1.199-3.539-3.449"/>
            </svg>
          </div>

          {/* Chart/Graph Icon - Right Side */}
          <div className="absolute top-14 right-40 animate-pulse opacity-45" style={{ animationDelay: '5s' }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#EDA35A" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}