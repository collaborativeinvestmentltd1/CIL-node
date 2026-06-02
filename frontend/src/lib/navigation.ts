"use client";

import { useRouter as useNextRouter } from "next/navigation";
import { useNavigation } from "@/components/providers/NavigationProvider";

/**
 * Drop-in router that triggers the global navigation loader before route changes.
 */
export function useAppRouter() {
  const router = useNextRouter();
  const { startNavigation } = useNavigation();

  return {
    ...router,
    push: (href: string, options?: Parameters<typeof router.push>[1]) => {
      startNavigation();
      return router.push(href, options);
    },
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) => {
      startNavigation();
      return router.replace(href, options);
    },
  };
}
