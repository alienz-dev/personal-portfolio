import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${site.displayName} — ${site.title}`,
  description: site.title,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.displayName} — ${site.title}`,
    description: site.title,
    url: `https://${site.domain}`,
    siteName: site.displayName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.displayName} — ${site.title}`,
    description: site.title,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
