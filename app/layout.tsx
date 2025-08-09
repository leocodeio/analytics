import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Analytics Dashboard - Simple Website Visit Counter",
    template: "%s | Analytics Dashboard"
  },
  description: "Track website visits with our simple, privacy-focused analytics platform. No complex setup, just total visit counts that matter.",
  keywords: ["analytics", "website tracking", "visit counter", "web analytics", "privacy-focused"],
  authors: [{ name: "Analytics Dashboard" }],
  creator: "Analytics Dashboard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analytics-dashboard.com",
    title: "Analytics Dashboard - Simple Website Visit Counter",
    description: "Track website visits with our simple, privacy-focused analytics platform.",
    siteName: "Analytics Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics Dashboard - Simple Website Visit Counter",
    description: "Track website visits with our simple, privacy-focused analytics platform.",
    creator: "@analytics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
