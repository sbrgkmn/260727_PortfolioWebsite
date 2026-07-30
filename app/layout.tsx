import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./_components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:5173";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sabri Gökmen — Architect, Designer, Educator",
    template: "%s — Sabri Gökmen",
  },
  description:
    "Work, teaching, publications, and grants by architect and computational designer Sabri Gökmen.",
  openGraph: {
    type: "website",
    title: "Sabri Gökmen — Architect, Designer, Educator",
    description:
      "Computational design across morphology, artificial intelligence, and material fabrication.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Sabri Gökmen portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabri Gökmen — Architect, Designer, Educator",
    description:
      "Computational design across morphology, artificial intelligence, and material fabrication.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
