"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingDiamond from "@/components/ui/LoadingDiamond";

type NavigationContextValue = {
  isNavigating: boolean;
  startNavigation: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

const MIN_VISIBLE_MS = 280;

function isInternalHref(href: string | null): boolean {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("http://") || href.startsWith("https://")) return false;
  return href.startsWith("/");
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const startedAt = useRef(0);
  const previousRoute = useRef("");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startNavigation = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    startedAt.current = Date.now();
    setIsNavigating(true);
  }, []);

  const finishNavigation = useCallback(() => {
    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    hideTimer.current = setTimeout(() => {
      setIsNavigating(false);
      hideTimer.current = null;
    }, remaining);
  }, []);

  useEffect(() => {
    const routeKey = `${pathname}?${searchParams.toString()}`;
    if (previousRoute.current && previousRoute.current !== routeKey) {
      finishNavigation();
    }
    previousRoute.current = routeKey;
  }, [pathname, searchParams, finishNavigation]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!isInternalHref(href)) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      const current = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;
      if (href === pathname || href === current) return;

      startNavigation();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, searchParams, startNavigation]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
      {isNavigating ? <LoadingDiamond message="Loading" /> : null}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
}
