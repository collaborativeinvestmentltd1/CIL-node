"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-accent-300 mb-4">CIL</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Built for Nigeria’s property market—trusted by tenants, investors,
              and corporate partners.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services" className="hover:text-accent-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-accent-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-accent-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-300 mb-2">
                Ready for your next portfolio?
              </p>
              <h3 className="text-2xl font-semibold text-white">
                Launch with CIL and start managing returns faster.
              </h3>
            </div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-primary-900 shadow-lg shadow-accent-500/30 hover:bg-accent-500 transition"
            >
              Join CIL today
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Collaborative Investment Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-300"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-300"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
