import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saqify Art Studio | Custom Art & Design Services",
  description: "Premier art studio offering custom designs, portraits, logos, and event painting. Bring your creative vision to life with Saqify Art Studio.",
  keywords: ["Art Studio", "Custom Art", "Portraits", "Logo Design", "Event Painting", "Saqify", "Digital Art"],
  authors: [{ name: "Saqify Art Studio" }],
  openGraph: {
    title: "Saqify Art Studio | Custom Art & Design Services",
    description: "Premier art studio offering custom designs, portraits, logos, and event painting.",
    siteName: "Saqify Art Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-white`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
