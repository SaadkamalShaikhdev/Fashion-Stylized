import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter,Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleAnalytics } from '@next/third-parties/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]

})


const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Fashion Stylized | Premium Wallets, Watches & Glasses in Pakistan",
  description:
    "Fashion Stylized offers premium wallets, watches, and glasses in Pakistan. Explore stylish accessories for men and women, featuring modern designs, quality craftsmanship, and timeless elegance.",

  keywords: [
    "Fashion Stylized",
    "wallets in Pakistan",
    "watches in Pakistan",
    "glasses in Pakistan",
    "fashion accessories Pakistan",
    "premium accessories",
    "men accessories",
    "women accessories",
    "online shopping Pakistan",
    "stylish accessories",
  ],

  openGraph: {
    title: "Fashion Stylized | Premium Wallets, Watches & Glasses in Pakistan",
    description:
      "Shop premium wallets, watches, and glasses in Pakistan. Discover stylish accessories designed for quality, comfort, and elegance.",
    type: "website",
    locale: "en_PK",
    siteName: "Fashion Stylized",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fashion Stylized | Premium Wallets, Watches & Glasses in Pakistan",
    description:
      "Explore premium wallets, watches, and glasses for men and women in Pakistan.",
  },
  metadataBase: new URL("https://fashionstylized.store"),
alternates: {
  canonical: "/",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased  ${geistSans.variable} ${inter.variable} ${cormorantGaramond.variable} ${geistMono.variable}`}
    >
      <body  className={`min-h-full flex flex-col  ${inter.className}`}>
        <AuthProvider>
 <GoogleAnalytics gaId="G-4TEVQNPBXP" />
{children}
        </AuthProvider>
</body>
    </html>
  );
}
