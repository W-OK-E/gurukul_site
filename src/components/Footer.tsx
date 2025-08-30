// export default function Footer() {
//   return (
//     <footer className="bg-gray-100 text-center text-sm p-4 space-y-1">
//       <p>© {new Date().getFullYear()} Gurukul. All rights reserved.</p>
//       <p className="text-gray-500">
//         Icons by{" "}
//       <a href="https://www.flaticon.com/free-icons/" title="music icons">Freepik - Flaticon</a>
//       </p>
//     </footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
        
        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300 mb-4">
            Our support is available to help you 24 hours a day, seven days a week.
          </p>
          
          <div className="mb-6">
            <h4 className="flex items-center gap-2 font-bold text-white mb-2">
              🇮🇳 INDIA
            </h4>
            <p className="text-sm text-gray-300">Noida, India</p>
            <p className="mt-2">📞 Tutor Support +91 8986841402</p>
            <p>✉ contact.gurukul@gurukul.org</p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-bold text-white mb-2">
              🇺🇸 USA
            </h4>
            <p className="text-sm text-gray-300">📞 Tutor Support: +1 91454 06207</p>
          </div>
        </div>

        {/* Academics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Academics (K-12)</h3>
          <ul className="space-y-2 text-sm">
            <li>Kindergarten</li>
            <li>Grade 1 – 12 Tutoring</li>
            <li>Exam Prep</li>
          </ul>
        </div>

        {/* Languages & Music */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Languages</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Hindi</li>
            <li>English</li>
            <li>French</li>
            <li>German</li>
            <li>Spanish</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Music</h3>
          <ul className="space-y-2 text-sm">
            <li>Guitar</li>
            <li>Piano & Keyboard</li>
            <li>Vocals</li>
          </ul>
        </div>

        {/* Tutoring Subjects */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tutoring Subjects</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Math</li>
            <li>Science</li>
            <li>English</li>
            <li>Algebra</li>
            <li>Calculus</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Coding</h3>
          <ul className="space-y-2 text-sm">
            <li>Python</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>HTML/CSS</li>
            <li>Scratch</li>
          </ul>
        </div>

        {/* Other Courses */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Courses</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Dance</li>
            <li>Art & Craft</li>
            <li>Creative Writing</li>
            <li>Chess</li>
            <li>Summer Classes</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Gurukul. All rights reserved.
      </div>
      <p className="text-gray-500">
        Icons by{" "}
      <a href="https://www.flaticon.com/free-icons/" title="music icons">Freepik - Flaticon</a>
      </p>
    </footer>
  );
}
