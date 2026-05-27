"use client";

import { useEffect, useState } from "react";
import TenantCard from "@/components/landlord/TenantCard";
import Billboard from "@/components/common/Billboard";
import { getLandlordTenants } from "@/services/landlordApi";

const fallbackTenants = [
  { id: "t1", name: "Ibrahim Hassan", unit: "Unit 5B", lastPayment: "May 2, 2026", docs: ["ID.pdf", "Lease.pdf"] },
  { id: "t2", name: "Ada Nwankwo", unit: "Unit 3A", lastPayment: "May 12, 2026", docs: ["ID.jpg"] },
];

export default function LandlordTenantsPage() {
  const [tenants, setTenants] = useState(fallbackTenants);

  useEffect(() => {
    getLandlordTenants("landlord-1")
      .then((result) => {
        if (result?.tenants) {
          setTenants(
            result.tenants.map((tenant: any) => ({
              id: tenant.id,
              name: tenant.name,
              unit: tenant.unit,
              lastPayment: tenant.lastPaymentDate || "Unknown",
              docs: tenant.documents || [],
            })),
          );
        }
      })
      .catch(() => {
        // keep fallback data on failure
      });
  }, []);

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Tenants</p>
          <h1 className="mt-3 text-3xl font-bold text-primary-900">Your tenants and payments</h1>
          <p className="mt-3 text-slate-600">View tenant records, documents, and payment history synced with tenant accounts.</p>
        </div>
      </header>

      <Billboard title="Global announcement" message="Reminder: Update your tenant verification documents before end of month." />

      <div className="grid gap-4 sm:grid-cols-2">
        {tenants.map((t) => (
          <TenantCard key={t.id || t.name} href={`/landlord/tenants/${t.id || t.name}`} tenant={t} />
        ))}
      </div>
    </div>
  );
}
