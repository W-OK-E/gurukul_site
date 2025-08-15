"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#CCF5AC] shadow-md" : "bg-[#ccf5ac]/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/gurukul-logo.png" alt="Gurukul Logo" className="w-8 h-8 rounded-full" />
          <span className={`${scrolled ? "text-[#3D2B56]" : "text-white"} font-bold text-lg`}>
            Gurukul
          </span>
        </Link>

        {/* Nav Links */}
        <div className={`hidden md:flex space-x-6 ${scrolled ? "text-[#3D2B56]" : "text-white"}`}>
          <Link href="#courses" className="hover:text-[#2C497F]">Courses</Link>
          <Link href="#about" className="hover:text-[#2C497F]">About</Link>
          <Link href="#contact" className="hover:text-[#2C497F]">Contact</Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#demo"
          className="px-4 py-2 bg-[#2C497F] text-white rounded-lg hover:bg-[#3D2B56] transition"
        >
          Join Now
        </Link>
      </div>
    </nav>
  );
}
