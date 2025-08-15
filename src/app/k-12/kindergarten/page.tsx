import Link from "next/link";
import { FaBook, FaPuzzlePiece, FaMusic, FaSmile } from "react-icons/fa";
import { PiPaintBrushBold } from "react-icons/pi";

export default function KindergartenPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#ccf5ac] py-16 px-6 flex flex-col md:flex-row items-center text-center md:text-left">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-[#2c497f] mb-4">
            Kindergarten Learning – Fun, Engaging & Effective!
          </h1>
          <p className="text-lg text-[#3d2b56] mb-6">
            Set the foundation for lifelong learning with playful and interactive lessons in Math, Language, and Creativity.
          </p>
          <Link
            href="#book-demo"
            className="px-6 py-3 bg-[#2c497f] text-white rounded-lg shadow-lg hover:bg-[#3d2b56] transition"
          >
            Book a Free Demo
          </Link>
        </div>
        <div className="relative w-full max-w-lg mx-auto">
          <svg viewBox="0 0 500 300" className="w-full h-auto">
            <defs>
              <clipPath id="cloudClip" clipPathUnits="objectBoundingBox">
                {/* Enlarged and more rounded cloud shape */}
                <path d="M0.2,0.55 
                        C0.05,0.35,0.35,0.05,0.5,0.25 
                        C0.65,0.05,0.95,0.35,0.8,0.55 
                        C1.05,0.65,0.95,0.95,0.5,0.9 
                        C0.3,1.05,0.05,0.75,0.2,0.55 Z" />
              </clipPath>
            </defs>
            <image
              href="/images/kg-illustration.jpg"
              width="500"
              height="300"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#cloudClip)"
            />
          </svg>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#2c497f] mb-12">
          Topics We Cover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Math Section */}
          <div className="bg-[#e1e9c9] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#3d2b56] mb-4 flex items-center gap-2">
              <FaPuzzlePiece /> Basic Math Skills
            </h3>
            <ul className="list-disc list-inside text-[#3d2b56]/90 space-y-2">
              <li>Counting numbers up to 100</li>
              <li>Basic shapes, patterns & colors</li>
              <li>Simple addition & subtraction</li>
              <li>Measurement and Comparison</li>
              <li>Addition and Substraction</li>
            </ul>
          </div>

          {/* Language Section */}
          <div className="bg-[#fee8d9] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#3d2b56] mb-4 flex items-center gap-2">
              <FaBook /> Language Skills
            </h3>
            <ul className="list-disc list-inside text-[#3d2b56]/90 space-y-2">
              <li>Alphabet recognition</li>
              <li>Phonics & pronunciation</li>
              <li>Basic vocabulary & sentence formation</li>
              <li>Storytelling and listening skills</li>
              <li>Upper case and Lower case letters</li>
              <li>CVC Words</li>
              <li>Pre-reading activities</li>
              <li>Pre-Writing Activities</li>
            </ul>
          </div>
        </div>

        {/* Midway Book Demo */}
        <div className="text-center mt-12">
          <Link
            href="#book-demo"
            className="px-6 py-3 bg-[#eda35a] text-white rounded-lg shadow-lg hover:bg-[#3d2b56] transition"
          >
            Schedule Your Free Class
          </Link>
        </div>
      </section>

      {/* Fun Activities Section */}
      <section className="bg-[#bad29f] py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-[#2c497f] mb-12">
          Learning Through Fun
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaMusic className="text-[#2c497f] text-3xl mx-auto mb-4" />
            <p>Music & Rhythm</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <PiPaintBrushBold className="text-[#2c497f] text-3xl mx-auto mb-4" />
            <p>Drawing & Coloring</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaSmile className="text-[#2c497f] text-3xl mx-auto mb-4" />
            <p>Interactive Games</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <FaBook className="text-[#2c497f] text-3xl mx-auto mb-4" />
            <p>Storytelling</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold text-[#2c497f] mb-4">
          Ready to Begin Your Child's Learning Journey?
        </h2>
        <Link
          href="#book-demo"
          className="px-6 py-3 bg-[#2c497f] text-white rounded-lg shadow-lg hover:bg-[#3d2b56] transition"
        >
          Book a Free Demo Now
        </Link>
      </section>
    </main>
  );
}
