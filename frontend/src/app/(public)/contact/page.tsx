"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(230,163,30,0.22),_transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-4">Contact</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">Let{"'"}s build your next property win together.</h1>
            <p className="mt-6 text-lg text-slate-200 max-w-2xl leading-8">
              Share your challenge and our team will respond with a tailored plan for your property portfolio.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 xl:grid-cols-5 xl:gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="xl:col-span-2 rounded-[2rem] bg-white p-10 shadow-sm border border-slate-200">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Contact details</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-100 text-accent-700 text-xl">
                    <FaEnvelope />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-900">Email</h3>
                    <p className="text-gray-600">hello@cil.ng</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-100 text-accent-700 text-xl">
                    <FaPhone />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-900">Phone</h3>
                    <p className="text-gray-600">+234 (0) 800 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-100 text-accent-700 text-xl">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary-900">Office</h3>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-[2rem] bg-primary-950 p-8 text-white">
                <p className="text-sm uppercase tracking-[0.32em] text-accent-300 mb-3">Need a demo?</p>
                <h3 className="text-2xl font-semibold mb-4 text-white">Schedule a walkthrough.</h3>
                <p className="text-slate-200 leading-7">
                  Our team will help you set up the right workflow for your portfolio and show the platform in action.
                </p>
                <button className="mt-6 inline-flex items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-primary-950 hover:bg-accent-500 transition">
                  Request a demo
                </button>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-900 hover:bg-slate-100 transition">
                  <FaLinkedin />
                </a>
                <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-900 hover:bg-slate-100 transition">
                  <FaTwitter />
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="xl:col-span-3 rounded-[2rem] bg-white p-10 xl:p-12 shadow-sm border border-slate-200">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6 xl:space-y-8">
                <div className="grid gap-5 sm:grid-cols-2 xl:gap-8">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Email Address</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:gap-8">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                      placeholder="+234 (912) 345-6789"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Subject</span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                      placeholder="How can we help?"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="Tell us about your request"
                  />
                </label>

                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-4 text-base font-semibold text-primary-950 hover:bg-accent-500 transition">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
