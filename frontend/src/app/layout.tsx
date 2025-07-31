import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Neurochain - Transparent AI Decision-Making",
  description: "Neurochain combines artificial intelligence with blockchain technology to create a transparent, auditable framework for AI decision-making.",
  keywords: ["AI", "blockchain", "transparency", "artificial intelligence", "decentralized", "validation"],
  authors: [{ name: "Neurochain Team" }],
  openGraph: {
    title: "Neurochain - Transparent AI Decision-Making",
    description: "Transparent AI decision-making powered by blockchain technology",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
