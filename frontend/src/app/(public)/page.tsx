"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StatCounter } from "@/components/common/StatCounter";
import { FeatureCard } from "@/components/common/FeatureCard";
import {
  FaLock,
  FaRocket,
  FaGlobe,
  FaHome,
  FaUsers,
  FaCreditCard,
  FaTools,
  FaChartBar,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const FEATURES = [
  {
    icon: FaHome,
    title: "Property Management",
    description: "Publish, manage, and update listings across your portfolio with ease.",
  },
  {
    icon: FaUsers,
    title: "Tenant Onboarding",
    description: "Collect applications, verify documents, and convert leads into tenancies.",
  },
  {
    icon: FaCreditCard,
    title: "Secure Payments",
    description: "Accept rent and deposits through Paystack with instant receipts and history.",
  },
  {
    icon: FaTools,
    title: "Service Requests",
    description: "Resolve maintenance issues faster with tenant reporting and status tracking.",
  },
  {
    icon: FaChartBar,
    title: "Reporting",
    description: "Track occupancy, revenue, and tenant performance in one dashboard.",
  },
  {
    icon: FaGlobe,
    title: "Portfolio Dashboard",
    description: "Manage multi-property operations from a single enterprise-grade dashboard.",
  },
];

const TESTIMONIALS = [
  {
    name: "Chioma Okonkwo",
    role: "Property Manager, Lagos",
    testimonial:
      "CIL helped us scale from 12 to 45 managed units in under 3 months. The tenant workflow is seamless and the payment tracking is reliable.",
    avatar: "CO",
    rating: 5,
  },
  {
    name: "Ibrahim Hassan",
    role: "Portfolio Owner, Abuja",
    testimonial:
      "We can now onboard tenants faster and keep every lease, payment, and request in one place. That visibility is a game changer.",
    avatar: "IH",
    rating: 5,
  },
  {
    name: "Ada Nwankwo",
    role: "Tenant, Ikeja",
    testimonial:
      "Applying for a new home felt modern and secure. I love that I can track my rent and requests from a single app.",
    avatar: "AN",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HomePage() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 text-white overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-accent-500 opacity-20 blur-3xl mix-blend-multiply"
            animate={{ y: [0, 40, -40, 0], x: [0, 45, -45, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ top: "10%", left: "8%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary-400 opacity-20 blur-3xl mix-blend-multiply"
            animate={{ y: [0, -40, 40, 0], x: [0, -60, 60, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ bottom: "10%", right: "8%" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.p
              variants={itemVariants}
              className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] text-accent-200"
            >
              PROPERTY MANAGEMENT PLATFORM
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white"
            >
              The smarter way to manage properties in Nigeria.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base md:text-lg text-slate-200 leading-8 max-w-2xl mx-auto"
            >
              CIL Properties brings listings, tenant onboarding, payments, and landlord operations
              into one secure platform.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-3 rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-primary-900 shadow-xl shadow-accent-500/30 hover:bg-accent-500 transition"
              >
                Join CIL Today
                <FaArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition"
              >
                See Features
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
            >
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-4xl font-bold text-accent-300">500+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                  Properties active
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-4xl font-bold text-accent-300">1,000+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                  Active users
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-4xl font-bold text-accent-300">₦2B+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                  Transactions processed
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
            >
              Built to make every property decision easier.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              CIL removes the friction from tenant onboarding, leasing, payments,
              and portfolio management so you can focus on growth.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: FaLock,
                title: "Secure operations",
                description:
                  "Encrypted data, strong auth, and user access controls built for corporate teams.",
              },
              {
                icon: FaRocket,
                title: "Fast approvals",
                description:
                  "Streamline applications, get decisions faster, and shorten vacancy cycles.",
              },
              {
                icon: FaGlobe,
                title: "Scale with confidence",
                description:
                  "Grow across cities and manage every property in one centralized platform.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-600 text-white text-2xl">
                  <item.icon />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-7">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "List with confidence",
                description:
                  "Add property details, images, and availability in a few clicks.",
              },
              {
                number: "02",
                title: "Convert applicants",
                description:
                  "Track applications, communicate with tenants, and approve quickly.",
              },
              {
                number: "03",
                title: "Collect on time",
                description:
                  "Accept rent payments, issue receipts, and automate follow-ups.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-900 text-white font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-7">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
            >
              Features that grow your business
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              The right tools for property portfolios, tenant onboarding, payments,
              and support requests.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FEATURES.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-all shadow-lg hover:shadow-xl"
            >
              Discover Every Capability <FaArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-300 mb-4">
                Proven outcomes
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Built to win trust and close more leads.
              </h2>
              <p className="max-w-xl text-gray-200 leading-8">
                CIL helps teams move faster with fewer manual tasks, better tenant
                communication, and a dependable payments engine.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: "Faster leasing", value: "50%" },
                { label: "Tenant satisfaction", value: "98%" },
                { label: "Portfolio growth", value: "30%" },
                { label: "Teams onboarded", value: "120+" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <p className="text-3xl font-semibold text-white mb-2">{item.value}</p>
                  <p className="text-sm text-gray-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
            >
              What our customers say
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Real users sharing the impact CIL brings to their operations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-accent-600" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  “{testimonial.testimonial}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-primary-900 p-10 text-white shadow-2xl shadow-primary-900/20 lg:flex lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-3">
                Ready for your next chapter?
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Join CIL and grow your property business with confidence.
              </h2>
              <p className="max-w-2xl text-gray-200 leading-8">
                Fast onboarding, intelligent tenant workflows, and reliable payments
                in one platform.
              </p>
            </div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-primary-900 shadow-xl shadow-accent-500/30 hover:bg-accent-500 transition"
            >
              Create my account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
