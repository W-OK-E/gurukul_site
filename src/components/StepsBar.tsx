"use client";

import { motion } from "framer-motion";
import { FaUserPlus, FaChalkboardTeacher, FaChalkboard, FaThumbsUp, FaMoneyBillWave, FaBookOpen } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const steps = [
  { title: "Register", color: "#ccf5ac", icon: <FaUserPlus size={30} /> },
  { title: "Choose Tutor", color: "#bad29f", icon: <FaChalkboardTeacher size={30} /> },
  { title: "Demo Class", color: "#808a9f", icon: <FaChalkboard size={30} /> },
  { title: "Feedback", color: "#2c497f", icon: <FaThumbsUp size={30} /> },
  { title: "Pay Fees", color: "#3d2b56", icon: <FaMoneyBillWave size={30} /> },
  { title: "Start Class", color: "#eda35a", icon: <FaBookOpen size={30} /> },
];

export default function StepsBar() {
  return (
    <div className="flex flex-col items-center mt-12">
      {/* Heading with Typing Effect */}
      <h2 className="text-2xl font-bold text-white mb-8">
        A Simple 5 Step Process for{" "}
        <TypeAnimation
          sequence={[
            "Better Grades", 2000,
            "Better Learning", 2000,
            "Strong Fundamentals", 2000,
            "Happy Learning", 2000,
          ]}
          wrapper="span"
          speed={50}
          deletionSpeed={30}
          repeat={Infinity}
          className="text-[#EDA35A]"
        />
      </h2>

      {/* Step Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-white rounded-lg shadow-lg p-4 w-36"
            style={{ backgroundColor: step.color }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
          >
            <div className="mb-2">{step.icon}</div>
            <h3 className="font-bold">{step.title}</h3>
            <p className="text-sm mt-1">Step {index + 1}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
