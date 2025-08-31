"use client";

import React from 'react';
import { BookOpen, Users, MessageSquare, CreditCard, Key, GraduationCap } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    {
      id: 1,
      title: "Book Demo",
      description: "Schedule your free demo session with our expert tutors",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      delay: "0ms"
    },
    {
      id: 2,
      title: "Demo Session",
      description: "Interactive one-on-one session with your assigned tutor",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      delay: "100ms"
    },
    {
      id: 3,
      title: "Feedback",
      description: "Share your experience and learning preferences",
      icon: MessageSquare,
      color: "from-pink-500 to-pink-600",
      delay: "200ms"
    },
    {
      id: 4,
      title: "Pay Fee",
      description: "Secure payment for your personalized learning journey",
      icon: CreditCard,
      color: "from-green-500 to-green-600",
      delay: "300ms"
    },
    {
      id: 5,
      title: "Get Access",
      description: "Receive your unique dashboard login credentials",
      icon: Key,
      color: "from-orange-500 to-orange-600",
      delay: "400ms"
    },
    {
      id: 6,
      title: "Start Learning",
      description: "Begin your structured classes with organized schedules",
      icon: GraduationCap,
      color: "from-indigo-500 to-indigo-600",
      delay: "500ms"
    }
  ];

  return (
    <section id = "journey" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Your Learning Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From first contact to structured learning - experience our seamless process designed for your success
          </p>
        </div>

        <div className="relative">
          {/* Connecting lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.8s ease-out forwards`,
                    animationDelay: step.delay,
                    opacity: 0
                  }}
                >
                  {/* Step number indicator */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-sm font-bold text-slate-600 z-20 group-hover:scale-110 transition-transform duration-300">
                    {step.id}
                  </div>

                  {/* Main card */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-slate-100 group-hover:border-slate-200">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                    
                    {/* Icon container */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                  </div>

                  {/* Arrow connector for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-30">
                      <div className="w-8 h-px bg-gradient-to-r from-slate-300 to-slate-400"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          onClick={() => window.location.href = '/booking'}>
            <BookOpen className="w-5 h-5" />
            Start Your Journey Today
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessFlow;