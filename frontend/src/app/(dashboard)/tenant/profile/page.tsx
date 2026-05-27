"use client";

import { useState } from "react";
import { FaUpload, FaShieldAlt, FaUser } from "react-icons/fa";
import Billboard from "@/components/common/Billboard";

export default function TenantProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "080 1234 5678",
    address: "Ikoyi, Lagos",
  });
  const [documents, setDocuments] = useState({
    id: "National ID.pdf",
    lease: "Lease Agreement.pdf",
    guarantor: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleProfileChange = (field: string, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = (field: keyof typeof documents, files: FileList | null) => {
    const name = files?.[0]?.name ?? "";
    setDocuments((current) => ({ ...current, [field]: name }));
  };

  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("Profile updated successfully.");
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Tenant profile</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">Manage your account and documents</h1>
            <p className="mt-3 text-slate-600">Update your profile information, upload required documents, and keep your verification status current.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-5 py-3 text-sm font-semibold text-primary-900">
            <FaShieldAlt className="text-accent-600" /> Document safety assured
          </div>
        </div>
      </header>

      <Billboard title="Personal notice" message="Your landlord has sent you a private notice: Please confirm access for repair on June 2." />

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-primary-900">Personal information</h2>
          <form onSubmit={saveProfile} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  value={profile.name}
                  onChange={(event) => handleProfileChange("name", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => handleProfileChange("email", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Phone</span>
                <input
                  value={profile.phone}
                  onChange={(event) => handleProfileChange("phone", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Address</span>
                <input
                  value={profile.address}
                  onChange={(event) => handleProfileChange("address", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
                Save profile
              </button>
              <button type="button" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition" onClick={() => setStatusMessage("Profile changes reverted.")}>
                Reset fields
              </button>
            </div>
            {statusMessage ? <p className="rounded-3xl bg-accent-50 p-4 text-sm text-primary-900">{statusMessage}</p> : null}
          </form>
        </section>

        <aside className="rounded-[2rem] bg-accent-50 p-8 shadow-sm border border-accent-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-900 text-white">
              <FaUpload />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-700">Document uploads</p>
              <h3 className="mt-2 text-xl font-semibold text-primary-900">Verified materials</h3>
            </div>
          </div>
          <div className="space-y-5">
            <label className="block rounded-3xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-semibold text-slate-700">National ID</span>
              <p className="mt-2 text-sm text-slate-500">{documents.id || "No file selected"}</p>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(event) => handleFileChange("id", event.target.files)}
                className="mt-4 w-full text-sm text-slate-700"
              />
            </label>
            <label className="block rounded-3xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-semibold text-slate-700">Lease agreement</span>
              <p className="mt-2 text-sm text-slate-500">{documents.lease || "No file selected"}</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => handleFileChange("lease", event.target.files)}
                className="mt-4 w-full text-sm text-slate-700"
              />
            </label>
            <label className="block rounded-3xl border border-slate-200 bg-white p-5">
              <span className="text-sm font-semibold text-slate-700">Guarantor document</span>
              <p className="mt-2 text-sm text-slate-500">{documents.guarantor || "No file selected"}</p>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(event) => handleFileChange("guarantor", event.target.files)}
                className="mt-4 w-full text-sm text-slate-700"
              />
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}
