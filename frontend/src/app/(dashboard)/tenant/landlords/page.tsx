"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBuilding, FaPaperPlane, FaUsers } from "react-icons/fa";
import { getTenantLandlords, sendTenantMessage } from "@/services/landlordApi";
import { Landlord } from "@/types/landlord";
import { getStoredUser } from "@/lib/auth";

export default function TenantLandlordsPage() {
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [selectedLandlordId, setSelectedLandlordId] = useState<string>("");
  const [subject, setSubject] = useState("Request for repair access");
  const [message, setMessage] = useState("Hi, I would like to request access to the property for a maintenance visit.");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tenantId, setTenantId] = useState("t1");

  useEffect(() => {
    setTenantId(getStoredUser()?.id || "t1");
  }, []);

  useEffect(() => {
    setLoading(true);
    getTenantLandlords(tenantId)
      .then((data) => {
        const fetched = data.landlords || [];
        setLandlords(fetched);
        if (fetched.length) {
          setSelectedLandlordId(fetched[0].landlordId || fetched[0].id);
        }
      })
      .catch(() => setLandlords([]))
      .finally(() => setLoading(false));
  }, [tenantId]);

  const selectedLandlord = landlords.find((item) => item.landlordId === selectedLandlordId || item.id === selectedLandlordId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLandlord) return;
    setSubmitting(true);
    setStatus("");

    try {
      await sendTenantMessage(tenantId, selectedLandlord.landlordId || selectedLandlord.id, {
        subject,
        message,
      });
      setStatus("Message sent to your landlord. You should hear back soon.");
      setSubject("Request for repair access");
      setMessage("Hi, I would like to request access to the property for a maintenance visit.");
    } catch (error: any) {
      setStatus(error?.message || "Unable to send the message right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Your landlord network</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">Contact and manage every landlord you rent from</h1>
            <p className="mt-4 text-slate-600">View your active landlord relationships, agreements, and send requests without leaving your tenant dashboard.</p>
          </div>
          <Link href="/tenant" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-primary-900 hover:bg-slate-100 transition">
            Back to renter dashboard
          </Link>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Landlords</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">All landlords connected to your lease</h2>
            </div>
            <div className="rounded-3xl bg-accent-50 px-4 py-3 text-sm font-semibold text-primary-900">{landlords.length} connected</div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500">Loading your landlord list...</div>
            ) : landlords.length ? (
              landlords.map((landlord) => (
                <div
            key={landlord.landlordId || landlord.id}
            onClick={() => setSelectedLandlordId(landlord.landlordId || landlord.id)}
            className={`cursor-pointer w-full rounded-3xl border px-6 py-5 text-left transition ${selectedLandlordId === (landlord.landlordId || landlord.id) ? 'border-primary-900 bg-primary-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-primary-900">{landlord.firstName} {landlord.lastName}</p>
                <p className="mt-1 text-sm text-slate-500">{landlord.email}</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">{landlord.payments?.length || 0} payments</div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-slate-500">
              <div className="rounded-2xl bg-slate-50 p-3">{landlord.agreements?.length || 0} current agreements</div>
              <div className="rounded-2xl bg-slate-50 p-3">{landlord.payments?.length || 0} tenant payments</div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Click to see landlord details, portfolio summary, and payment status.</p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Includes agreements and payment summary</span>
              <Link href={`/tenant/landlords/${landlord.landlordId || landlord.id}`} className="font-semibold text-primary-900 hover:text-primary-700">
                View details →
              </Link>
            </div>
          </div>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500">You have no landlords connected yet. Start by signing up or verifying your lease information.</div>
            )}
          </div>
        </section>

        <aside className="rounded-[2rem] bg-accent-50 p-8 shadow-sm border border-accent-100">
          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Message a landlord</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Send a request</h2>
            </div>
            <p className="text-sm leading-7 text-slate-700">Pick a landlord and send a quick note for maintenance, lease updates, or questions about your unit.</p>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Selected landlord</p>
              <p className="mt-2 text-lg font-semibold text-primary-900">{selectedLandlord ? `${selectedLandlord.firstName} ${selectedLandlord.lastName}` : 'Choose a landlord above'}</p>
              <p className="text-sm text-slate-500">{selectedLandlord?.email || 'No landlord selected'}</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Subject
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  placeholder="What is this about?"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  placeholder="Write your message to the landlord"
                />
              </label>
              {status ? <p className="rounded-3xl bg-primary-50 px-4 py-3 text-sm text-primary-900">{status}</p> : null}
              <button
                type="submit"
                disabled={!selectedLandlord || submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaPaperPlane /> Send message
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
