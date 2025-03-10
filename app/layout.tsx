import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import { getURL } from "@/utils/helpers";
import { Poppins } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/SelfPresent/lib/utils";
import { LogSnagProvider } from "@logsnag/next";
import { PHProvider } from "./providers";
import { UIProvider } from "./uiProvider";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const meta = {
  title: "Self Represent AI | selfrepresent.ai",
  description:
    "AI event tracker for single parents. Keep records on your ex for court",
  cardImage: "/og.jpg",
  robots: "follow, index",
  favicon: "/favicon.ico",
  url: getURL(),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: "origin-when-cross-origin",
    keywords: [
      "Self Represent",
      "Self Represent AI",
      "Event Tracker",
      "Pro se AI",
      "Family law",
    ],
    authors: [{ name: "Self Represent AI", url: "https://selfrepresent.ai/" }],
    creator: "Self Represent AI",
    publisher: "Self Represent AI",
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: "website",
      siteName: meta.title,
    },
    twitter: {
      card: "summary_large_image",
      site: "@SelfRepresentAI",
      creator: "@SelfRepresentAI",
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PHProvider>
        <head>
          <LogSnagProvider token="<TOKEN_NAME>" project="<PROJECT_NAME>" />
          <style>
            {`::selection {
                background-color: rgb(74, 74, 74);
                color: white !important;
              }
              .dark ::selection {
                background-color: rgb(255, 255, 255);
                color: rgb(53, 53, 53) !important;
              }`}
          </style>
        </head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <UIProvider>
            {/* <NextSSRPlugin

        routerConfig={extractRouterConfig(ourFileRouter)}
      /> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main>
                
                <Script
                  async
                  src="https://cdn.promotekit.com/promotekit.js"
                  data-promotekit="661dd8b6-30eb-4cb2-abdf-f39bc459c5a2"
                ></Script>
                {children}
              </main>
            </ThemeProvider>
            <SpeedInsights />
            <Analytics />
          </UIProvider>
        </body>
      </PHProvider>
    </html>
  );
}
