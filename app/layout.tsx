import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SneaksUp",
  description: "s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.cdnfonts.com/css/satoshi"
            rel="stylesheet"
          />
        </head>
        <body
          style={{
            fontFamily: "Satoshi, sans-serif",
          }}
        >
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
