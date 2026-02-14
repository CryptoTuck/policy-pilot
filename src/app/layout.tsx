import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadataBase = new URL("https://www.mypolicypilot.ai");

export const metadata: Metadata = {
  title: "PolicyPilot — Your Insurance Policy, Scored by AI",
  description:
    "Get your free AI-powered insurance policy score in 60 seconds. PolicyPilot analyzes your home, auto, and renters coverage to find gaps, savings, and risks — no calls, no spam.",
  openGraph: {
    title: "PolicyPilot — Your Insurance Policy, Scored by AI",
    description:
      "Get your free AI-powered insurance policy score in 60 seconds. Find coverage gaps, savings, and risks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PolicyPilot — Your insurance policy, scored by AI",
      },
    ],
    type: "website",
    siteName: "PolicyPilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolicyPilot — Your Insurance Policy, Scored by AI",
    description:
      "Get your free AI-powered insurance policy score in 60 seconds. Find coverage gaps, savings, and risks.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f4f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#f3f4f6" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#f3f4f6" }}
      >
        {children}
      </body>
    </html>
  );
}
