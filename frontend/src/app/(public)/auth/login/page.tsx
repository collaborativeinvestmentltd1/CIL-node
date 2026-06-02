"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { FaEnvelope, FaLock, FaSignInAlt, FaGoogle, FaLinkedin } from "react-icons/fa";
import LoadingDiamond from "@/components/ui/LoadingDiamond";
import { loginUser } from "@/services/authApi";
import { setSession } from "@/lib/auth";
import { getDashboardPath } from "@/lib/routes";
import { useAppRouter } from "@/lib/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useAppRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await loginUser({ email, password });
      setSession(result.accessToken, result.user);
      const from =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from")
          : null;
      const destination = from && from.startsWith("/") ? from : getDashboardPath(result.user.role);
      router.push(destination);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-24 bg-slate-50 min-h-screen">
      {isLoading && <LoadingDiamond message="Signing in" />}
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2.25rem] bg-white shadow-2xl md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-6">
        <div className="hidden min-h-[560px] rounded-l-[2.25rem] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-12 text-white md:block">
          <div className="space-y-10">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-200">Welcome back</p>
              <h1 className="mt-4 text-4xl font-bold text-white">Secure access for your property workflow.</h1>
            </div>
            <p className="text-lg leading-8 text-slate-200">
              Sign in to continue managing applications, payments, tenant interactions, and corporate property operations.
            </p>
            <div className="space-y-4 rounded-[2rem] bg-white/10 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaSignInAlt />
                <span>Fast access to dashboards and reports</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaLock />
                <span>Secure sessions and encrypted logins</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-10 sm:p-12 lg:p-14">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <Link href="/" className="text-3xl font-bold text-primary-900 hover:text-primary-700">
              CIL
            </Link>
            <p className="mt-4 text-3xl font-semibold text-primary-900">Sign in to your account</p>
            <p className="mt-3 text-base text-gray-600">Login your dashboard and secure access to tenant, property, and corporate tools.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              Email address
              <div className="mt-2 relative rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-200">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full border-none bg-transparent pl-11 text-slate-900 outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Password
              <div className="mt-2 relative rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-200">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full border-none bg-transparent pl-11 text-slate-900 outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <Link href="/auth/reset-password" className="font-medium text-accent-600 hover:text-accent-700">
                Forgot password?
              </Link>
              <span className="text-slate-400">Secure login</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm uppercase tracking-[0.24em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <FaGoogle /> Google
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <FaLinkedin /> LinkedIn
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don{"'"}t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-accent-600 hover:text-accent-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
