import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import CoursesFilter from "@/components/CoursesFilter";
import Testimonials from "@/components/Testimonials";
import ProcessFlow from "@/components/processFlowComp";

export default function Page() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="relative z-0 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        {/* Doodle shapes */}
        <svg
          className="absolute top-20 left-10 w-40 h-40 text-purple-300 opacity-40 -z-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M40,-60C55,-50,70,-40,75,-25C80,-10,75,10,65,25C55,40,40,55,20,65C0,75,-25,80,-45,70C-65,60,-80,35,-80,10C-80,-15,-65,-40,-45,-55C-25,-70,0,-75,20,-70C40,-65,55,-70,40,-60Z"
          />
        </svg>

        <svg
          className="absolute bottom-40 right-20 w-32 h-32 text-pink-400 opacity-30 -z-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>

        <img
          src="/shapes/girl_book.svg"
          className="absolute top-40 left-20 w-80 opacity-40 -z-10"
        />
        <img
          src="/shapes/ai.svg"
          className="absolute top-160 left-3/4 w-80 opacity-40 -z-10 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="/shapes/ai.svg"
          className="absolute top-160 left-3/4 w-80 opacity-40 -z-10 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Sections */}
        <WhoWeAre />
        <WhyChooseUs />
        <CoursesFilter />
        <ProcessFlow />
        <Testimonials />
      </div>
    </main>
  );
}




