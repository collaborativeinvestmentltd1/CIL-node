"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaTrophy, FaUsers, FaGlobeAmericas } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(230,163,30,0.22),_transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-4">Our story</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">Built for modern property operations in Nigeria.</h1>
            <p className="mt-6 text-lg text-slate-200 max-w-2xl leading-8">
              CIL modernizes real estate operations with a platform designed for rapid growth, transparent payments, and seamless tenant experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Why CIL exists</h2>
              <p className="text-lg text-gray-600 leading-8 mb-6">
                Nigeria{"'"}s property economy is growing fast, but the systems behind it are still scattered. We built CIL to remove complexity, reduce risk, and give every stakeholder a clear path to confident decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-3xl bg-accent-100 text-accent-700">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">Fast onboarding</h3>
                    <p className="text-gray-600">Move tenants from application to approval in hours, not days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-3xl bg-accent-100 text-accent-700">
                    <FaGlobeAmericas />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">Trusted operations</h3>
                    <p className="text-gray-600">Standardize workflows, payment collection, and reporting across every property.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-3xl bg-accent-100 text-accent-700">
                    <FaTrophy />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">High performance</h3>
                    <p className="text-gray-600">Designed for busy teams that need clarity, speed, and secure execution.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2">
              {[
                { label: "Established", value: "2024" },
                { label: "Cities Served", value: "5+" },
                { label: "Properties Managed", value: "500+" },
                { label: "Teams Active", value: "120+" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[2rem] border border-slate-200 p-8 bg-slate-50 shadow-sm">
                  <p className="text-3xl font-bold text-primary-900">{stat.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-600">Core values</p>
            <h2 className="text-4xl font-bold text-primary-900 mt-4">Driven by purpose, built for property teams</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: FaUsers,
                title: "Collaboration",
                description: "We partner with teams to solve real estate challenges together.",
              },
              {
                icon: FaTrophy,
                title: "Excellence",
                description: "We deliver thoughtful, reliable tools that teams trust every day.",
              },
              {
                icon: FaCheckCircle,
                title: "Integrity",
                description: "Security, transparency, and fair processes are built into our platform.",
              },
              {
                icon: FaGlobeAmericas,
                title: "Impact",
                description: "We help properties and portfolios grow with confidence and efficiency.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-5 rounded-3xl bg-accent-100 p-5 inline-flex text-2xl text-accent-700">
                  <item.icon />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-7">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">Partner with CIL</h2>
          <p className="text-lg text-gray-600 mb-10">From tenant onboarding to corporate portfolio management, our platform gives you the tools to operate smarter and scale faster.</p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/auth/signup" className="inline-flex items-center justify-center rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition">
              Start free trial
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-primary-900 hover:border-primary-300 transition">
              Talk to sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
