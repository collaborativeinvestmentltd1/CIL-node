"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDiamond from "@/components/ui/LoadingDiamond";

export default function ProfileRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = window.localStorage.getItem("cil_user");
    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      const userData = JSON.parse(user);
      const role = userData?.role || "tenant";

      const roleProfileMap: { [key: string]: string } = {
        tenant: "/dashboard/tenant/profile",
        landlord: "/dashboard/landlord/profile",
        agent: "/dashboard/agent/profile",
        realEstate: "/dashboard/real-estate/profile",
      };

      const profilePath = roleProfileMap[role] || "/dashboard/tenant/profile";
      router.push(profilePath);
    } catch (_) {
      router.push("/dashboard/tenant/profile");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingDiamond message="Redirecting to profile" />
    </div>
  );
}
