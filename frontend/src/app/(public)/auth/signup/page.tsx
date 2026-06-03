"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { FaUser, FaBriefcase, FaShieldAlt, FaGoogle, FaLinkedin, FaTools, FaCreditCard } from "react-icons/fa";
import LoadingDiamond from "@/components/ui/LoadingDiamond";
import { getSocialProfile, registerUser } from "@/services/authApi";
import { setSession } from "@/lib/auth";
import { getDashboardPath } from "@/lib/routes";
import { useAppRouter } from "@/lib/navigation";

type UserType = "tenant" | "landlord" | "agent" | "realEstate" | "operations" | "finance" | "";

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyRegNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyWebsite: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useAppRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!userType) return setError("Please select an account type.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");

    if (userType === "realEstate") {
      if (!formData.companyName) return setError("Company name is required");
      if (!formData.companyRegNumber) return setError("Company registration number is required");
    } else {
      if (!formData.firstName) return setError("First name is required");
      if (!formData.lastName) return setError("Last name is required");
    }

    setIsLoading(true);
    try {
      const payload: any = {
        email: formData.email,
        password: formData.password,
        role: userType,
      };

      if (userType === "realEstate") {
        payload.companyName = formData.companyName;
        payload.companyRegNumber = formData.companyRegNumber;
        payload.firstName = formData.companyName;
        payload.lastName = formData.companyRegNumber;
      } else {
        payload.firstName = formData.firstName;
        payload.lastName = formData.lastName;
      }

      if (formData.phone) payload.phone = formData.phone;
      if (formData.companyWebsite) payload.companyWebsite = formData.companyWebsite;

      const result = await registerUser(payload);
      setSession(result.accessToken, result.user);
      router.push(getDashboardPath(result.user.role));
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "linkedin") => {
    if (userType === "realEstate") {
      setError("Social signup is not available for corporate accounts. Please sign up manually.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const profile = await getSocialProfile(provider);
      setFormData((p) => ({ ...p, firstName: profile.firstName, lastName: profile.lastName, email: profile.email }));
    } catch (err: any) {
      setError(err?.message || "Social lookup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: "tenant", label: "Tenant", icon: FaUser },
    { value: "landlord", label: "Property Owner", icon: FaBriefcase },
    { value: "agent", label: "Agent", icon: FaBriefcase },
    { value: "realEstate", label: "Real Estate Partner", icon: FaShieldAlt },
    { value: "operations", label: "Operations Staff", icon: FaTools },
    { value: "finance", label: "Finance Staff", icon: FaCreditCard },
  ];

  const isRealEstate = userType === "realEstate";

  return (
    <div className="relative py-24 bg-slate-50 min-h-screen">
      {isLoading && <LoadingDiamond message="Creating account" />}
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2.25rem] bg-white shadow-2xl lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="hidden min-h-[640px] rounded-l-[2.25rem] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-12 text-white lg:block">
          <div className="space-y-10">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-accent-200">Create account</p>
              <h1 className="mt-4 text-4xl font-bold text-white">Start managing with confidence.</h1>
            </div>
            <p className="text-lg leading-8 text-slate-200">
              {isRealEstate
                ? "Register your real estate company and gain access to commission tracking, KYC verification, and partnership tools."
                : "Choose your account type and get access to tools for tenants, agents, landlords, and property operators."}
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

        <div className="p-10 sm:p-12 lg:p-14 overflow-y-auto max-h-screen">
          <div className="mb-8 text-center">
            <Link href="/" className="text-3xl font-bold text-primary-900 hover:text-primary-700">
              CIL
            </Link>
            <p className="mt-4 text-3xl font-semibold text-primary-900">Choose your account type</p>
          </div>

          {error && (
            <div className="mb-5 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
          )}

          <div className="mb-6 grid grid-cols-2 gap-3">
            {roleOptions.map((option) => (
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
            {isRealEstate && (
              <>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Company full name *</span>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="Your company name"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>Company registration number *</span>
                  <input
                    type="text"
                    name="companyRegNumber"
                    value={formData.companyRegNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="RC123456"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>Company website (optional)</span>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="https://yourcompany.com"
                  />
                </label>
              </>
            )}

            {!isRealEstate && (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>First name *</span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="John"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>Last name *</span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                    placeholder="Doe"
                  />
                </label>
              </div>
            )}

            <label className="space-y-2 text-sm text-slate-700">
              <span>Email address *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="you@example.com"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Password *</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="Create a password"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span>Confirm password *</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  placeholder="Repeat password"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-700">
              <span>Phone number (optional)</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                placeholder="0801 234 5678"
              />
            </label>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                required
                disabled={isLoading}
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

          {!isRealEstate && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleSocial("google")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <FaGoogle /> Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocial("linkedin")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <FaLinkedin /> Continue with LinkedIn
                </button>
              </div>
            </>
          )}

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

