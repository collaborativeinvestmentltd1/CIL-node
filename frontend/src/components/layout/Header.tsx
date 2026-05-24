"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-max">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary-600 hover:text-primary-700"
          >
            CIL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 border-t">
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
            <Link href="/auth/login" className="btn-ghost text-left">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-primary text-center">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
