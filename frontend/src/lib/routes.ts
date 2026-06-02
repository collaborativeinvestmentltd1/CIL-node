/**
 * Canonical route helpers — all dashboard URLs live at /tenant, /landlord, etc.
 */

export type SidebarRole =
  | "tenant"
  | "landlord"
  | "admin"
  | "corporate"
  | "agent"
  | "realEstate";

export function getDashboardPath(role: string): string {
  switch (role) {
    case "landlord":
      return "/landlord";
    case "admin":
      return "/admin";
    case "corporate":
      return "/corporate";
    case "agent":
      return "/agent";
    case "realEstate":
      return "/real-estate";
    default:
      return "/tenant";
  }
}

export function getProfilePath(role: string): string {
  switch (role) {
    case "landlord":
      return "/landlord/profile";
    case "admin":
      return "/admin";
    case "corporate":
      return "/corporate";
    case "agent":
      return "/agent/profile";
    case "realEstate":
      return "/real-estate/profile";
    default:
      return "/tenant/profile";
  }
}

export function roleToSidebarType(role: string): SidebarRole {
  if (role === "landlord") return "landlord";
  if (role === "admin") return "admin";
  if (role === "corporate") return "corporate";
  if (role === "agent") return "agent";
  if (role === "realEstate") return "realEstate";
  return "tenant";
}

export const PROTECTED_PREFIXES = [
  "/tenant",
  "/landlord",
  "/admin",
  "/corporate",
  "/agent",
  "/real-estate",
  "/profile",
] as const;
