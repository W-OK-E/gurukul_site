import Image from "next/image";

const featured = [
  { title: "Chess Mastery", img: "/courses/chess.jpg" },
  { title: "AI & Machine Learning", img: "/courses/ai.jpg" },
  { title: "Learn Music", img: "/courses/music.jpg" },
];

export default function FeaturedCourses() {
  return (
    <section className="py-16 bg-[#808a9f] text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Special Courses</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto px-6">
        {featured.map((course, i) => (
          <div key={i} className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg group">
            <Image src={course.img} alt={course.title} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-semibold">{course.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
