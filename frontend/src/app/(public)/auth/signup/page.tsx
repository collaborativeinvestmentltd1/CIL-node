"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaUser, FaBriefcase, FaHandshake, FaBuilding, FaGoogle } from "react-icons/fa";
import LoadingDiamond from "@/components/ui/LoadingDiamond";
import { registerUser } from "@/services/authApi";

type UserType = "tenant" | "landlord" | "agent" | "realEstate" | "";

const userTypeOptions = [
  { value: "tenant", label: "Tenant", icon: FaUser, description: "Looking for rental properties" },
  { value: "landlord", label: "Landlord", icon: FaBriefcase, description: "Own and manage properties" },
  { value: "agent", label: "Agent", icon: FaHandshake, description: "Market properties & earn commission" },
  { value: "realEstate", label: "Real Estate Co.", icon: FaBuilding, description: "Partner with CIL" },
];

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
  const router = useRouter();

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
      const result = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: userType,
      });
      window.localStorage.setItem('cil_token', result.data.accessToken);
      window.localStorage.setItem('cil_user', JSON.stringify(result.data.user));
      
      // Route based on user type
      const routeMap: Record<string, string> = {
        tenant: '/dashboard/tenant',
        landlord: '/dashboard/landlord',
        agent: '/dashboard/agent',
        realEstate: '/dashboard/real-estate',
      };
      
      router.push(routeMap[userType] || '/dashboard/tenant');
    } catch (err: any) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement OAuth with Google
    alert('Google signup coming soon!');
  };

  return (
    <div className="relative py-24 bg-slate-50 min-h-screen">
      {isLoading && <LoadingDiamond message="Creating account" />}
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2.25rem] bg-white shadow-2xl lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="hidden min-h-[800px] rounded-l-[2.25rem] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-10">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-200">Create account</p>
              <h1 className="mt-4 text-4xl font-bold">Start your journey with CIL</h1>
            </div>
            <p className="text-lg leading-8 text-slate-200">
              Join thousands of users managing properties, finding rentals, earning commissions, and growing their real estate business with us.
            </p>
            <div className="space-y-4 rounded-[2rem] bg-white/10 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaBriefcase className="flex-shrink-0" /> For every role in real estate
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaHandshake className="flex-shrink-0" /> Secure & verified platform
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <FaBuilding className="flex-shrink-0" /> Partnership opportunities
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-300">
            <p className="font-medium">Already have an account?</p>
            <Link href="/auth/login" className="text-accent-300 hover:text-accent-200 font-semibold mt-2 inline-block">
              Sign in instead →
            </Link>
          </div>
        </div>

        <div className="p-10 sm:p-12 lg:p-14 overflow-y-auto max-h-screen">
          <div className="mb-8 text-center">
            <Link href="/" className="text-3xl font-bold text-primary-900 hover:text-primary-700 inline-block">
              CIL
            </Link>
            <p className="mt-3 text-2xl font-semibold text-primary-900">Choose your role</p>
            <p className="mt-2 text-sm text-gray-600">Select the account type that best fits your needs</p>
          </div>

          {error && (
            <div className="mb-5 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {userTypeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setUserType(option.value as UserType)}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                  userType === option.value
                    ? "border-accent-600 bg-accent-50 text-primary-900 shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <option.icon className={`text-xl ${userType === option.value ? 'text-accent-600' : 'text-slate-400'}`} />
                  <span className="font-semibold text-sm">{option.label}</span>
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">First name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isLoading || !userType}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="John"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Last name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isLoading || !userType}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Doe"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Email address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="Create a secure password"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading || !userType}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="Repeat password"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading || !userType}
              className="w-full rounded-full bg-accent-600 px-6 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs uppercase tracking-[0.24em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={!userType || isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-lg text-red-500" /> Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-accent-600 hover:text-accent-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
