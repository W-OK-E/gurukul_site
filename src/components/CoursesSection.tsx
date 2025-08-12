"use client";
import { useState } from "react";

const classesData = {
  "Class 6": ["Math", "Science", "English"],
  "Class 7": ["Math", "Science", "History"],
  "Class 8": ["Math", "Physics", "Biology"],
};

const subjectsData = {
  Math: ["Class 6", "Class 7", "Class 8"],
  Science: ["Class 6", "Class 7"],
  English: ["Class 6", "Class 8"],
};

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<"class" | "subject">("class");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <section className="bg-[#FEE8D9] py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => {
              setActiveTab("class");
              setSelectedKey(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "class"
                ? "bg-[#EDA35A] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            By Class
          </button>
          <button
            onClick={() => {
              setActiveTab("subject");
              setSelectedKey(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "subject"
                ? "bg-[#EDA35A] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            By Subject
          </button>
        </div>

        {/* Content */}
        {activeTab === "class" && (
          <>
            {!selectedKey ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.keys(classesData).map((className) => (
                  <div
                    key={className}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer"
                    onClick={() => handleSelect(className)}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{className}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="mb-4 text-blue-600 hover:underline"
                >
                  ← Back to Classes
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedKey} Subjects</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {classesData[selectedKey].map((subject) => (
                    <div
                      key={subject}
                      className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
                    >
                      <h4 className="text-lg font-semibold">{subject}</h4>
                      <button className="mt-3 bg-[#EDA35A] text-white px-4 py-2 rounded hover:bg-orange-500">
                        View Course
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "subject" && (
          <>
            {!selectedKey ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.keys(subjectsData).map((subjectName) => (
                  <div
                    key={subjectName}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer"
                    onClick={() => handleSelect(subjectName)}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{subjectName}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="mb-4 text-blue-600 hover:underline"
                >
                  ← Back to Subjects
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedKey} Classes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {subjectsData[selectedKey].map((className) => (
                    <div
                      key={className}
                      className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
                    >
                      <h4 className="text-lg font-semibold">{className}</h4>
                      <button className="mt-3 bg-[#EDA35A] text-white px-4 py-2 rounded hover:bg-orange-500">
                        View Course
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
