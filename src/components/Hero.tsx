import CoursesMarquee from "./CoursesMarquee";
import Link from "next/link";
import StepsBar from "./StepsBar";

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
      >
        <source src="/bg-video.mp4" type="video/mp4"/>
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
          href="#demo"
          className="px-6 py-3 text-lg bg-[#2C497F] text-white rounded-lg shadow-lg transform transition hover:scale-105 hover:bg-[#3D2B56] mb-8"
        >
          Book a Free Demo
        </Link>

        {/* Courses Marquee */}
        <div className="w-full">
          <CoursesMarquee />
        </div>

        {/* Steps Bar */}
        <StepsBar />
      </div>
    </section>
  );
}