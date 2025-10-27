import type { Metadata } from "next";
import "./globals.css";
import PWAInstallPrompt from "../component/PWAInstallPrompt/page";
import { inter } from "@/src/Font/font";
import { StoreProvider } from "../lib/store/StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Entri",
  description: "Entri",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Entri",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/entri/entri.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Entri" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable}`}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
      <PWAInstallPrompt />
    </html>
  );
}
