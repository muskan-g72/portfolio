import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muskan.engineering"),
  title: {
    default: "Muskan — Software Engineer",
    template: "%s — Muskan",
  },
  description:
    "Software engineer at Thapar Institute of Engineering and Technology. Building reliable systems across the stack. Open to SWE internships.",
  openGraph: {
    title: "Muskan — Software Engineer",
    description:
      "Reliable software systems — from the interface to the infrastructure. Open to SWE internships.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muskan — Software Engineer",
    description:
      "Reliable software systems — from the interface to the infrastructure. Open to SWE internships.",
  },
  keywords: [
    "Muskan",
    "software engineer",
    "Thapar",
    "internship",
    "VeriGate",
    "Orchestrix",
    "RateShield",
    "TaskForge",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full bg-bg font-sans text-text">
        <ThemeProvider>
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
