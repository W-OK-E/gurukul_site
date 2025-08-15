import Image from "next/image";
import Link from "next/link";

export default function ClassUnits({ data }: { data: { icon: string; title: string; topics: string[] }[] }) {
  return (
    <div className="space-y-8">
      {data.map((unit, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-6 border border-gray-200">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Image src={unit.icon} alt={unit.title} width={40} height={40} className="mr-3" />
            <h2 className="text-xl font-bold">{unit.title}</h2>
          </div>

          {/* Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            {unit.topics.map((topic, i) => (
              <div key={i}>• {topic}</div>
            ))}
          </div>

          {/* Book Demo Button every two units */}
          {(index + 1) % 2 === 0 && (
            <div className="mt-4">
              <Link
                href="/book-demo"
                className="px-4 py-2 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56] transition"
              >
                Book Free Demo
              </Link>
            </div>
          )}
        </div>
      ))}

      {/* Final Book Demo CTA */}
      <div className="text-center mt-8">
        <Link
          href="/book-demo"
          className="px-6 py-3 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56] transition"
        >
          Book Your Free Demo Now
        </Link>
      </div>
    </div>
  );
}
