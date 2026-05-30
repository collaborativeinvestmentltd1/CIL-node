"use client";

import { useEffect } from "react";
import LoadingDiamond from "@/components/ui/LoadingDiamond";
import { getStoredUser } from "@/lib/auth";
import { getProfilePath } from "@/lib/routes";
import { useAppRouter } from "@/lib/navigation";

export default function ProfileRedirect() {
  const router = useAppRouter();

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    router.replace(getProfilePath(user.role));
  }, [router]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <LoadingDiamond message="Redirecting to profile" />
    </div>
  );
}
