import Link from "next/link";
import { FaChalkboardTeacher, FaTasks, FaUserFriends, FaClock } from "react-icons/fa";
import { PiBookBold } from "react-icons/pi";

const classes = [
  { name: "Kindergarten", icon: "🎨" },
  { name: "Grade 1", icon: "1️⃣" },
  { name: "Grade 2", icon: "2️⃣" },
  { name: "Grade 3", icon: "3️⃣" },
  { name: "Grade 4", icon: "4️⃣" },
  { name: "Grade 5", icon: "5️⃣" },
  { name: "Grade 6", icon: "6️⃣" },
  { name: "Grade 7", icon: "7️⃣" },
  { name: "Grade 8", icon: "8️⃣" },
  { name: "Grade 9", icon: "9️⃣" },
  { name: "Grade 10", icon: "🔟" },
  { name: "Grade 11", icon: "1️⃣1️⃣" },
  { name: "Grade 12", icon: "1️⃣2️⃣" },
];

const whyChooseUs = [
  {
    title: "1-on-1 Master Classes",
    desc: "Personalized sessions tailored to your child's needs.",
    icon: <FaChalkboardTeacher size={30} />,
  },
  {
    title: "Regular Assignments",
    desc: "Reinforce learning with consistent, structured tasks.",
    icon: <FaTasks size={30} />,
  },
  {
    title: "Parents-Teacher Feedback",
    desc: "Keep track of progress with regular feedback sessions.",
    icon: <FaUserFriends size={30} />,
  },
  {
    title: "Self-Paced Learning",
    desc: "Students learn at their own pace for better understanding.",
    icon: <FaClock size={30} />,
  },
];

export default function K12Page() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#ccf5ac] py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2c497f] mb-4">
          World-Class 1-on-1 K–12 Tutoring from the Comfort of Your Home
        </h1>
        <p className="text-lg text-[#3d2b56] max-w-3xl mx-auto mb-8">
          Welcome to the all-in-one solution for your child's tutoring needs.
        </p>
        <Link
          href="/booking"
          className="px-6 py-3 bg-[#2c497f] text-white rounded-lg shadow-lg hover:bg-[#3d2b56] transition"
        >
          Book a Free Demo
        </Link>
      </section>

      {/* Class Tiles */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {classes.map((grade, index) => (
            <Link
              key={index}
              href={`/k-12/${grade.name.toLowerCase().replace(" ", "-")}`}
              className="bg-[#e1e9c9] p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition flex flex-col items-center justify-center text-center font-semibold text-[#2c497f]"
            >
              <span className="text-3xl mb-2">{grade.icon}</span>
              {grade.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Midway Book Demo Button */}
      <section className="text-center my-12">
        <Link
          href="/booking"
          className="px-6 py-3 bg-[#eda35a] text-white rounded-lg shadow-lg hover:bg-[#3d2b56] transition"
        >
          Book Your Spot Now
        </Link>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#bad29f] py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#2c497f] mb-12">
          Why Choose Gurukul for K–12 Learning?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-[#2c497f] mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg text-[#3d2b56] mb-2">{item.title}</h3>
              <p className="text-[#3d2b56]/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
