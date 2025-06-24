import type { Metadata } from "next";
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
export const metadata: Metadata = {
  title: "ItoolsAI - Automate and Monetize Your Twitter Presence",
  description:
    "ItoolsAI helps content creators and brands automate their Twitter accounts with AI-powered tools. Schedule tweets, grow your audience, and monetize effortlessly.",
  keywords: [
    "Twitter automation",
    "AI-powered content",
    "tweet scheduler",
    "social media management",
    "monetize Twitter",
    "grow audience",
    "content creators",
    "digital marketing",
  ],
  authors: [{ name: "ItoolsAI Team", url: "https://itoolsai.com" }],
  openGraph: {
    title: "ItoolsAI - Automate and Monetize Your Twitter Presence",
    description:
      "Manage your Twitter account like a pro. Schedule tweets, generate AI-powered content, and monetize your account—all in one place.",
    url: "https://itoolsai.com",
    siteName: "ItoolsAI",
    images: [
      {
        url: "https://itoolsai.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ItoolsAI - Automate and Monetize Your Twitter Presence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ItoolsAI - Automate and Monetize Your Twitter Presence",
    description:
      "Manage your Twitter account like a pro. Schedule tweets, generate AI-powered content, and monetize your account—all in one place.",
    site: "@itoolsai",
    creator: "@itoolsai",
    images: ["https://itoolsai.com/images/twitter-card.png"],
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
        style={{ overflowX: "hidden" }}
        className={`${geistSans.variable} ${geistMono.variable}  bg-white h-[100vh] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
