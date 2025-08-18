"use client";
import Image from "next/image";
import Link from "next/link";

// Editable course list — add/remove here
const courses = [
  {
    title: "K–12 Learning",
    description: "School curriculum from KG to 12th grade.",
    href: "/k-12",
    image: "/icons/k12.png",
    bgColor: "bg-[#ccf5ac]",
  },
  {
    title: "Artificial Intelligence",
    description: "Learn AI fundamentals and applications.",
    href: "/ai",
    image: "/icons/ai.png",
    bgColor: "bg-[#bad29f]",
  },
  {
    title: "Robotics",
    description: "For the young and old tinkerers alike.",
    href: "/robitcs",
    image: "/icons/robotics.png",
    bgColor: "bg-[#ccf5ac]",
  },
  {
    title: "Programming",
    description: "From basics to advanced coding.",
    href: "/programming",
    image: "/icons/code.png",
    bgColor: "bg-[#bad29f]",
  },
  {
    title: "Music",
    description: "Master instruments & music theory.",
    href: "/music",
    image: "/icons/music.png",
    bgColor: "bg-[#ccf5ac]",
  },
  {
    title: "Dummy",
    description: "Course Desc",
    href: "/music",
    image: "/icons/music.png",
    bgColor: "bg-[#ccf5ac]",
  },
];

export default function CourseTiles() {
  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Link
              key={index}
              href={course.href}
              className={`${course.bgColor} rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform`}
            >
              {/* Image / Icon */}
              {course.image && (
                <div className="w-20 h-20 mb-4 relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-center">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-center text-gray-700">
                {course.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
