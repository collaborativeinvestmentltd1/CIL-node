"use client";

import { useState } from "react";
import { FaUpload, FaShieldAlt, FaFileContract, FaIdCard } from "react-icons/fa";
import Billboard from "@/components/common/Billboard";

export default function RealEstateProfilePage() {
  const [profile, setProfile] = useState({
    companyName: "Tech Real Estate Ltd",
    companyEmail: "hello@techrealestate.com",
    companyPhone: "080 1234 5678",
    registrationNumber: "RC1234567",
    companyAddress: "Lagos, Nigeria",
    website: "https://techrealestate.com",
  });

  const [documents, setDocuments] = useState({
    regCertificate: "Certificate of Incorporation.pdf",
    taxClearance: "",
    businessPermit: "",
    directorId: "",
    companyBankStatement: "",
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
    setStatusMessage("Company profile updated successfully. Documents pending verification.");
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Real Estate Partner</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">Manage company and verification documents</h1>
            <p className="mt-3 text-slate-600">Update your company information and upload required documents for verification. All documents must match your registration details.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-5 py-3 text-sm font-semibold text-primary-900">
            <FaShieldAlt className="text-accent-600" /> Verification pending
          </div>
        </div>
      </header>

      <Billboard title="Document Verification" message="All submitted documents must match your company registration details. Our team will verify within 2-3 business days. You will receive an email upon completion." />

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2 rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-primary-900">Company Information</h2>
          <form onSubmit={saveProfile} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Company Name</span>
                <input
                  value={profile.companyName}
                  onChange={(event) => handleProfileChange("companyName", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Registration Number</span>
                <input
                  value={profile.registrationNumber}
                  onChange={(event) => handleProfileChange("registrationNumber", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Company Email</span>
                <input
                  type="email"
                  value={profile.companyEmail}
                  onChange={(event) => handleProfileChange("companyEmail", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Phone Number</span>
                <input
                  value={profile.companyPhone}
                  onChange={(event) => handleProfileChange("companyPhone", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Address</span>
                <input
                  value={profile.companyAddress}
                  onChange={(event) => handleProfileChange("companyAddress", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Website</span>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(event) => handleProfileChange("website", event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
                Save Company Details
              </button>
              <button type="button" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition" onClick={() => setStatusMessage("Company changes reverted.")}>
                Reset Fields
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
              <p className="text-sm uppercase tracking-[0.24em] text-accent-700">Verification</p>
              <h3 className="mt-2 text-xl font-semibold text-primary-900">Status</h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl border border-accent-200 bg-white p-3 text-xs">
              <p className="font-semibold text-primary-900">✓ Basic Info: Complete</p>
            </div>
            <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-3 text-xs">
              <p className="font-semibold text-yellow-900">⏳ Documents: Pending</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 text-xs">
              <p className="font-semibold text-slate-700">○ Full Access: Awaiting Documents</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-primary-900 mb-6">Required Verification Documents</h2>
        <p className="text-sm text-slate-600 mb-6">All documents must be clear, readable, and match your company registration details. Accepted formats: PDF, JPG, PNG.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Certificate of Incorporation */}
          <label className="block rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition">
            <div className="flex flex-col items-center text-center">
              <FaFileContract className="text-3xl text-primary-900 mb-3" />
              <span className="text-sm font-semibold text-slate-700">Certificate of Incorporation</span>
              <p className="mt-2 text-xs text-slate-500">{documents.regCertificate || "No file selected"}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(event) => handleFileChange("regCertificate", event.target.files)}
              className="hidden"
            />
          </label>

          {/* Tax Clearance */}
          <label className="block rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition">
            <div className="flex flex-col items-center text-center">
              <FaIdCard className="text-3xl text-primary-900 mb-3" />
              <span className="text-sm font-semibold text-slate-700">Tax Clearance Certificate</span>
              <p className="mt-2 text-xs text-slate-500">{documents.taxClearance || "No file selected"}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(event) => handleFileChange("taxClearance", event.target.files)}
              className="hidden"
            />
          </label>

          {/* Business Permit */}
          <label className="block rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition">
            <div className="flex flex-col items-center text-center">
              <FaShieldAlt className="text-3xl text-primary-900 mb-3" />
              <span className="text-sm font-semibold text-slate-700">Business Permit / License</span>
              <p className="mt-2 text-xs text-slate-500">{documents.businessPermit || "No file selected"}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(event) => handleFileChange("businessPermit", event.target.files)}
              className="hidden"
            />
          </label>

          {/* Director ID */}
          <label className="block rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition">
            <div className="flex flex-col items-center text-center">
              <FaIdCard className="text-3xl text-primary-900 mb-3" />
              <span className="text-sm font-semibold text-slate-700">Director ID / Passport</span>
              <p className="mt-2 text-xs text-slate-500">{documents.directorId || "No file selected"}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(event) => handleFileChange("directorId", event.target.files)}
              className="hidden"
            />
          </label>

          {/* Bank Statement */}
          <label className="block rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition">
            <div className="flex flex-col items-center text-center">
              <FaFileContract className="text-3xl text-primary-900 mb-3" />
              <span className="text-sm font-semibold text-slate-700">Recent Bank Statement</span>
              <p className="mt-2 text-xs text-slate-500">{documents.companyBankStatement || "No file selected"}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(event) => handleFileChange("companyBankStatement", event.target.files)}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> After submitting your documents, our verification team will review them within 2-3 business days. You&apos;ll receive email notifications at each stage. Incomplete or illegible documents may be rejected and require resubmission.
          </p>
        </div>

        <button className="mt-6 rounded-full bg-primary-900 px-8 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
          Submit Documents for Verification
        </button>
      </section>
    </div>
  );
}
