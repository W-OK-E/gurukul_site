"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const feeRanges: Record<string, string[]> = {
  USD: ["5-6", "6-7", "7-8", "8-9", "9-10"],
  INR: ["200-300", "300-400", "400-500", "500-600"],
  EUR: ["5-7", "7-9", "9-11", "11-13"],
};

export default function BookDemoPage() {
  const [currency, setCurrency] = useState("USD");
  const [expectedRangeOptions, setExpectedRangeOptions] = useState(feeRanges["USD"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    country: "",
    currency: "USD",
    city: "",
    grade: "",
    course: "",
    timezone: "",
    preferredTimings: "",
    topics: "",
    expectedFee: "",
    communicationMode: "",
    notes: "",
  });

  useEffect(() => {
    setExpectedRangeOptions(feeRanges[currency] || []);
    setFormData((prev) => ({ ...prev, expectedFee: "" }));
  }, [currency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "currency") setCurrency(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("bookings").insert([formData]);
      if (error) {
        alert("Error saving booking: " + error.message);
      } else {
        alert("Booking submitted successfully!");
        setFormData({
          studentName: "",
          parentName: "",
          email: "",
          phone: "",
          country: "",
          currency: "USD",
          city: "",
          grade: "",
          course: "",
          timezone: "",
          preferredTimings: "",
          topics: "",
          expectedFee: "",
          communicationMode: "",
          notes: "",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Book Your Free Demo
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take the first step towards academic excellence. Schedule a personalized demo session with our expert tutors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Student Details Section */}
          <div className="backdrop-blur-sm bg-white/80 shadow-xl rounded-2xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Student Details</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Student Name</label>
                  <input 
                    type="text" 
                    name="studentName" 
                    placeholder="Enter student's full name" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.studentName} 
                    onChange={handleChange} 
                    onFocus={() => setFocusedField("studentName")}
                    onBlur={() => setFocusedField("")}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                  <input 
                    type="text" 
                    name="parentName" 
                    placeholder="Enter parent's full name" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.parentName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="example@email.com" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="+1 234 567 8900" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input 
                    type="text" 
                    name="country" 
                    placeholder="United States" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.country} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <select 
                    name="currency" 
                    value={formData.currency} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="New York" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.city} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Demo Preferences Section */}
          <div className="backdrop-blur-sm bg-white/80 shadow-xl rounded-2xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Demo Preferences</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                  <select 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Grade Level</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Course/Subject</label>
                  <input 
                    type="text" 
                    name="course" 
                    placeholder="Mathematics, Physics, Chemistry..." 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.course} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Timezone</label>
                  <input 
                    type="text" 
                    name="timezone" 
                    placeholder="EST, IST, CET..." 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.timezone} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Timings</label>
                  <input 
                    type="text" 
                    name="preferredTimings" 
                    placeholder="Morning, Evening, Weekends..." 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    value={formData.preferredTimings} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Demo Topics (Optional)</label>
                <input 
                  type="text" 
                  name="topics" 
                  placeholder="Specific topics you'd like to cover in the demo" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  value={formData.topics} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expected Fee Range</label>
                  <select 
                    name="expectedFee" 
                    value={formData.expectedFee} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Expected Fee Range</option>
                    {expectedRangeOptions.map((range) => (
                      <option key={range} value={range}>{range} {currency}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Communication Mode</label>
                  <select 
                    name="communicationMode" 
                    value={formData.communicationMode} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Preferred Communication</option>
                    <option value="Email">📧 Email</option>
                    <option value="Whatsapp">💬 WhatsApp</option>
                    <option value="Phone">📞 Phone</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea 
                  name="notes" 
                  placeholder="Any specific requirements or questions you'd like to share..." 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                  value={formData.notes} 
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
 <div className="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Booking"
              )}
            </button>
            
            <p className="text-gray-500 text-sm mt-4">
              🔒 Your information is secure and will only be used to schedule your demo session.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}