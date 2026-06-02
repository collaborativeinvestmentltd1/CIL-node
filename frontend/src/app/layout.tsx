import type { Metadata } from "next";
import "@/styles/globals.css";
import AppProviders from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "CIL Properties — Property Management Platform",
  description:
    "Modern property management for landlords and tenants in Nigeria. Listings, applications, payments, and tenant portals.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="bg-white font-sans text-gray-900 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
