"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-primary-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3">CIL Properties</h3>
            <p className="text-sm leading-6 text-slate-300">
              Modern property management for landlords and tenants across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/services" className="hover:text-accent-300">Features</Link></li>
              <li><Link href="/auth/signup" className="hover:text-accent-300">Get started</Link></li>
              <li><Link href="/contact" className="hover:text-accent-300">Contact sales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-accent-300">About</Link></li>
              <li><Link href="/blog" className="hover:text-accent-300">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/contact" className="hover:text-accent-300">Privacy</Link></li>
              <li><Link href="/contact" className="hover:text-accent-300">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-2">
                Start managing smarter
              </p>
              <h3 className="text-xl font-semibold text-white">Launch your property operations on CIL Properties.</h3>
            </div>
            <Link href="/auth/signup" className="btn-secondary shrink-0">
              Create account
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          © {currentYear} Collaborative Investment Ltd. CIL Properties. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
