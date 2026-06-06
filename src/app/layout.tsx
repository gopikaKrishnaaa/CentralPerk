import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Central Perk Chennai | Cozy Friends-Inspired American Café",
  description: "Experience premium American comfort food, artisan coffee, and the nostalgic New York coffeehouse culture in the heart of Chennai. Book your orange couch spot today.",
  keywords: ["Central Perk Chennai", "Friends Cafe Chennai", "American Restaurant Chennai", "Theme Cafe Chennai", "Best Coffee Chennai"],
  authors: [{ name: "Central Perk Chennai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal-black text-cream-white font-sans selection:bg-central-orange selection:text-charcoal-black">
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}


