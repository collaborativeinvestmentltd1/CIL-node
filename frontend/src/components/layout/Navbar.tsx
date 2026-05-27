"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaBuilding, FaInfoCircle, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const navLinks = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "Services", href: "/services", icon: FaBuilding },
    { label: "About", href: "/about", icon: FaInfoCircle },
    { label: "Contact", href: "/contact", icon: FaPhoneAlt },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-3 hover:text-primary-700 transition-colors">
              <div className="relative w-28 h-10">
                <Image src="/logo.svg" alt="CIL logo" fill sizes="112px" className="object-contain" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary-900 transition-colors duration-200 group"
                  >
                    <Icon
                      size={18}
                      className="text-accent-600 group-hover:text-accent-500 transition-colors"
                    />
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-primary-900 font-medium border border-primary-900 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="md:hidden pb-4 border-t border-gray-100"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className="text-accent-600" />
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <div className="px-4 py-4 flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="w-full px-4 py-2 text-center text-primary-900 font-medium border border-primary-900 rounded-lg hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="w-full px-4 py-2 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
