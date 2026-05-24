"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { FaUser, FaBriefcase, FaShieldAlt } from "react-icons/fa";

type UserType = "tenant" | "corporate" | "";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userType, setUserType] = useState<UserType>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userType) {
      setError("Please select a user type");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Signup attempt:", { ...formData, userType });
      alert(`Signup feature coming soon. User type: ${userType}`);
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="mx-auto grid w-full max-w-5xl gap-8 rounded-[2rem] overflow-hidden bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-12 text-white md:block">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-200">Create account</p>
              <h1 className="mt-4 text-4xl font-bold">Start managing with confidence.</h1>
            </div>
            <p className="text-lg leading-8 text-slate-200">
              Choose your account type and get access to tools for tenants, corporate teams, and property operators.
            </p>
            <div className="space-y-4 rounded-[2rem] bg-white/10 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaShieldAlt /> Secure onboarding and verification
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaUser /> Powerful workflows for every user
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaBriefcase /> Built for portfolio growth
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="mb-8 text-center">
            <Link href="/" className="text-3xl font-bold text-primary-900 hover:text-primary-700">
              CIL
            </Link>
            <p className="mt-4 text-2xl font-semibold text-primary-900">Choose your account type</p>
            <p className="mt-2 text-gray-600">Tenant and corporate sign-up with tailored workflows.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-8 grid grid-cols-2 gap-3">
            {[
              { value: "tenant", label: "Tenant", icon: FaUser },
              { value: "corporate", label: "Corporate", icon: FaBriefcase },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setUserType(option.value as UserType)}
                className={`flex flex-col items-center justify-center gap-3 rounded-3xl border p-4 text-sm font-semibold transition ${
                  userType === option.value
                    ? "border-accent-600 bg-accent-50 text-primary-900 shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary-300"
                }`}
              >
                <option.icon className="text-2xl text-accent-600" />
                {option.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>First name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isLoading || !userType}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="John"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Last name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isLoading || !userType}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="Doe"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-700">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="you@example.com"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="Create a password"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="Repeat password"
              />
            </label>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                required
                disabled={isLoading || !userType}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="text-accent-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-accent-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !userType}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent-600 px-6 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-accent-600 hover:text-accent-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
