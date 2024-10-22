import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import favicon from "@/public/sneakerLogo.ico";

export const metadata: Metadata = {
  title: "SneaksUp",
  description:
    "Discover the best sneakers for men, women, and kids at SneaksUp. Enjoy a seamless shopping experience with secure payments through Stripe and effortless browsing by color and size.",
  openGraph: {
    title: "SneaksUp: Your Ultimate Sneaker Destination",
    description:
      "Discover the best sneakers for men, women, and kids at SneaksUp. Enjoy a seamless shopping experience with secure payments through Stripe and effortless browsing by color and size.",
    url: "https://mj-sneaks-up.vercel.app/",
    siteName: "SneaksUp",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/e0477b8a-cfe7-447a-9571-3e9574712196.png?token=HihefybdK_NcJCK9rv2OCwcw6xazTD8-mqLUfNNeKKE&height=642&width=1200&expires=33265640445", // URL to a preview image
        width: 1200,
        height: 642,
        alt: "SneaksUp Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SneaksUp: Your Ultimate Sneaker Destination",
    description:
      "Discover the best sneakers for men, women, and kids at SneaksUp. Enjoy a seamless shopping experience with secure payments through Stripe and effortless browsing by color and size.",
    images: [
      "https://opengraph.b-cdn.net/production/images/e0477b8a-cfe7-447a-9571-3e9574712196.png?token=HihefybdK_NcJCK9rv2OCwcw6xazTD8-mqLUfNNeKKE&height=642&width=1200&expires=33265640445",
    ], // URL to a preview image optimized for Twitter
  },
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
          <link rel="icon" href={favicon.src} type="image/x-icon" />
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
