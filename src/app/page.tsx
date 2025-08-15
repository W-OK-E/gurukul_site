import Hero from "@/components/Hero";
import CoursesMarquee from "@/components/CoursesMarquee";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import CoursesFilter from "@/components/CoursesFilter";
import FeaturedCourses from "@/components/FeaturedCourses";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <WhyChooseUs />
      <CoursesFilter />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
