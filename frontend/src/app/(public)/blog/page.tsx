"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaTag, FaArrowRight, FaMailBulk } from "react-icons/fa";

const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Ways to Reduce Tenant Vacancy",
    excerpt: "Proven strategies to keep properties occupied and revenue flowing.",
    author: "Chioma Okonkwo",
    date: "2024-05-20",
    category: "Management",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Future of Digital Rent Payments in Nigeria",
    excerpt: "How secure digital payments are transforming the market.",
    author: "Ibrahim Hassan",
    date: "2024-05-15",
    category: "Payments",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Scaling Your Property Portfolio",
    excerpt: "A step-by-step guide to growing from 5 to 50+ units.",
    author: "Ada Nwankwo",
    date: "2024-05-10",
    category: "Growth",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Tenant Onboarding That Works",
    excerpt: "Best practices for fast, compliant tenant screening.",
    author: "Emeka Obi",
    date: "2024-05-05",
    category: "Tenants",
    readTime: "6 min read",
  },
];

const CATEGORIES = ["All", "Management", "Payments", "Growth", "Tenants"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(
    () =>
      selectedCategory === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <>
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(230,163,30,0.24),_transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-4">Insights</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">News and expert guides for property operators.</h1>
            <p className="mt-6 text-lg text-slate-200 max-w-2xl leading-8">
              Learn from industry experts, discover new trends, and find ideas that help you unlock more value from every asset.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-accent-600 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-52 bg-gradient-to-br from-accent-600 via-primary-900 to-primary-700" />
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-primary-900 shadow-sm">
                      <FaCalendarAlt /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-primary-900 shadow-sm">
                      <FaTag /> {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-900 mb-4">{post.title}</h2>
                  <p className="text-gray-600 leading-7 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>By {post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.id}`} className="mt-6 inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700">
                    Read article <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-primary-900 p-10 text-white shadow-lg">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-3">Subscribe</p>
                <h2 className="text-3xl font-semibold text-white">Receive weekly property intelligence.</h2>
                <p className="mt-3 text-slate-200 max-w-2xl leading-7">
                  Join the CIL newsletter for data-backed insights, product updates, and market commentary.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-slate-300 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-accent-600 px-8 py-3 text-sm font-semibold text-primary-950 shadow-lg shadow-accent-500/30 hover:bg-accent-500 transition">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
