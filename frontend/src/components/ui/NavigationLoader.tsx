"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingDiamond from "@/components/ui/LoadingDiamond";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const previousPath = useRef(pathname + searchParams.toString());

  useEffect(() => {
    // Initial load
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (previousPath.current !== currentPath) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 400);
      previousPath.current = currentPath;
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  if (!isLoading) return null;
  return <LoadingDiamond message="Loading" />;
}
