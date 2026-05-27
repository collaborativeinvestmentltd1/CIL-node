"use client";

import { useNavigation } from "next/navigation";
import type { ReactNode } from "react";

import LoadingDiamond from "@/components/ui/LoadingDiamond";

type NavigationLoaderProps = {
  children: ReactNode;
};

export default function NavigationLoader({ children }: NavigationLoaderProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <LoadingDiamond message="Loading" />}
      {children}
    </>
  );
}
