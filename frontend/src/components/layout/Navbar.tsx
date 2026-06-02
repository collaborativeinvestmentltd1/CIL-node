"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="container-max">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-9 w-24">
              <Image src="/logo.svg" alt="CIL Properties" fill sizes="96px" className="object-contain" />
            </div>
            <span className="hidden text-sm font-semibold text-primary-900 lg:inline">Properties</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-slate-100 text-primary-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/login" className="btn-ghost px-4 py-2">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-secondary">
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-primary-900"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {isOpen ? (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href ? "bg-slate-100 text-primary-900" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/auth/login" className="btn-ghost w-full text-center" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/auth/signup" className="btn-secondary w-full text-center" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
