import type { Metadata } from "next";
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "CIL - Collaborative Investment Ltd",
  description: "Integrated property, investment, and workforce ecosystem in Nigeria",
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
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
