"use client";

export default function CallToAction() {
  return (
    <section className="relative py-24 max-w-6xl mx-auto text-center">
      {/* Optional Background Overlay */}
      {/* <div className="absolute inset-0 bg-[#2C497F]/90 z-0"></div> */}

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Learning Journey Today!
        </h2>
        <p className="mb-6 text-lg">
          Join <span className="text-[#EDA35A] font-semibold">Gurukul</span> and unlock your true potential with expert guidance.
        </p>
        <button className="bg-[#EDA35A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FEE8D9] hover:text-[#2C497F] transition"
          onClick={() => window.location.href = '/booking'}>
          Enroll Now
        </button>
      </div>
    </section>
  );
}

  // <p className="text-lg text-gray-600 max-w-3xl mx-auto">
  //         At <span className="font-semibold text-[#2c497f]">Gurukul</span>, we believe learning should be engaging, 
  //         personalized, and accessible to everyone. Our mission is to connect students with expert tutors, 
  //         provide high-quality resources, and inspire curiosity in every learner.  
  //         Whether it’s acing school exams, mastering a new skill, or exploring your passions,  
  //         Gurukul is your one-stop tutoring solution.