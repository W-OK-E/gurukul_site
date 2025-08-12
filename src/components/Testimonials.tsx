export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#E1E9C9] rounded-lg shadow">
            <p>"Gurukul transformed my learning experience!"</p>
            <span className="mt-4 block font-semibold">— Student A</span>
          </div>
          <div className="p-6 bg-[#E1E9C9] rounded-lg shadow">
            <p>"The tutors are world-class and very approachable."</p>
            <span className="mt-4 block font-semibold">— Student B</span>
          </div>
          <div className="p-6 bg-[#E1E9C9] rounded-lg shadow">
            <p>"Highly recommend for anyone wanting quality education."</p>
            <span className="mt-4 block font-semibold">— Student C</span>
          </div>
        </div>
      </div>
    </section>
  );
}
