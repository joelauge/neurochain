import type { Metadata } from "next";
import "./output.css"; // Temporarily use the generated Tailwind CSS
import { Web3Provider } from "@/components/Web3Provider";
import { GlobalNav } from "@/components/GlobalNav";

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
      <body className="font-sans antialiased">
        <Web3Provider>
          <GlobalNav />
          <main className="pt-28">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
