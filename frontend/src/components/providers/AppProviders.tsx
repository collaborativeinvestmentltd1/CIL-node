"use client";

import { Suspense, type ReactNode } from "react";
import { NavigationProvider } from "./NavigationProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NavigationProvider>{children}</NavigationProvider>
    </Suspense>
  );
}
