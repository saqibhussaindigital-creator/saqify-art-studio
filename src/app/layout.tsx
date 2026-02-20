import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Saqify Art Studio – Custom Art, Sketches & Calligraphy",
  description: "Premium custom sketches, paintings, Islamic calligraphy, gifts, wall art, and art supplies for local and international clients.",
  keywords: ["Saqify Art Studio", "custom art studio", "pencil sketch artist", "Islamic calligraphy", "art studio Pakistan"],
  authors: [{ name: "Saqify Art Studio" }],
  openGraph: {
    title: "Saqify Art Studio – Custom Art, Sketches & Calligraphy",
    description: "Premium custom sketches, paintings, Islamic calligraphy, gifts, wall art, and art supplies for local and international clients.",
    siteName: "Saqify Art Studio",
    locale: "en_US",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-primary-charcoal text-accent-ivory transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <WhatsAppButton />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
