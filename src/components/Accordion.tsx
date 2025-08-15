"use client";
import { useState, ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  return (
   <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
  {/* Accordion Header */}
  <div
    onClick={() => setIsOpen(!isOpen)}
    className="w-full flex justify-between items-center p-4 bg-[#E6F3D6] hover:bg-[#CCF5AC] transition-colors cursor-pointer"
  >
    <span className="font-semibold text-[#2C497F]">{title}</span>

    <div className="flex items-center space-x-3">
      <button
        className="px-3 py-1 bg-[#2C497F] text-white text-sm rounded-md hover:bg-[#3D2B56] transition"
        onClick={(e) => {
          setIsViewing(!isViewing);
        }}
      >
     {isViewing ? "Hide Content" : "View Content"}
      </button>
      <ChevronDownIcon
        className={`w-5 h-5 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  </div>

  {/* Accordion Content */}
  <div
    className={`transition-all duration-300 ease-in-out ${
      isOpen ? "max-h-screen opacity-100 p-4" : "max-h-0 opacity-0 p-0"
    } overflow-hidden bg-white`}
  >
    {children}
  </div>
</div>
  );
}
