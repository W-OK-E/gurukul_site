"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

export default function Navbar({user}: {user:any}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on a dashboard page
  const isDashboardPage = pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-purple-600 shadow-md" : "bg-purple-600/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/gurukul-logo.png" alt="Gurukul Logo" className="w-8 h-8 rounded-full" />
          <span className="text-white font-bold text-lg">
            Gurukul
          </span>
        </Link>

        {/* Nav Links - Hide on dashboard pages or show different links */}
        <div className="hidden md:flex space-x-6 text-white">
          {isDashboardPage ? (
            // Dashboard navigation
            <>
              <Link href="/dashboard" className="hover:text-pink-200">
                Dashboard
              </Link>
              {user && (
                <span className="text-pink-200">
                  Welcome, {user.full_name || user.email}
                </span>
              )}
            </>
          ) : (
            // Public navigation
            <>
              <Link href="/#courses" className="hover:text-pink-200">Courses</Link>
              <Link href="/#about" className="hover:text-pink-200">About</Link>
              <Link href="/booking" className="hover:text-pink-200">Demo</Link>
            </>
          )}
        </div>

        {/* CTA Button - Login or Logout based on context */}
        {isDashboardPage || user ? (
          <form action={logoutAction}>
            <button 
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </form>
        ) : (
          <Link href="/login">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile menu button - you can expand this later */}
      <div className="md:hidden absolute right-6 top-1/2 transform -translate-y-1/2">
        <button className="text-white hover:text-pink-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}