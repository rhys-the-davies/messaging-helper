import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Messaging Helper",
  description: "Get help creating brand-consistent content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
