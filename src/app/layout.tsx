import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Rayyan | DevOps Engineer",
  description:
    "Muhammad Rayyan is a DevOps & Cloud Engineer specializing in scalable infrastructure, CI/CD automation, Kubernetes, Terraform, and DevSecOps practices.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "DevSecOps",
    "Kubernetes",
    "Terraform",
    "AWS",
    "CI/CD",
    "Infrastructure as Code",
    "Muhammad Rayyan",
  ],
  authors: [{ name: "Muhammad Rayyan" }],
  openGraph: {
    title: "Muhammad Rayyan | DevOps Engineer",
    description:
      "Building Scalable Infrastructure • Automating Everything • Cloud Native",
    url: "https://muhammadrayyan.dev",
    siteName: "Muhammad Rayyan",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://muhammadrayyan.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#080808" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
