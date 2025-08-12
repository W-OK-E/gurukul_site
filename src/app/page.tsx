import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import CoursesSection from "@/components/CoursesSection";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <StatsCounter />
      <CoursesSection />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
