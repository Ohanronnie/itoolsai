import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script"; 

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
// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Twitter conversion tracking script */}
        <Script id="twitter-pixel" strategy="beforeInteractive">
          {`
            !function(e,t,n,s,u,a){
              e.twq||(s=e.twq=function(){
                s.exe ? s.exe.apply(s,arguments) : s.queue.push(arguments);
              },
              s.version='1.1',
              s.queue=[],
              u=t.createElement(n),
              u.async=!0,
              u.src='https://static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],
              a.parentNode.insertBefore(u,a))
            }(window,document,'script');
            twq('config','q1m9z');
          `}
        </Script>
      </head>
      <body
        style={{ overflowX: 'hidden' }}
        className={`${geistSans.variable} ${geistMono.variable} bg-white h-[100vh] antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-T5H61K9L34" />
      </body>
    </html>
  );
}

