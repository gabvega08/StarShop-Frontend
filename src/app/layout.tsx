import { ReactNode } from "react";
import ReactQueryProvider from "@/providers/query-client-provider";
import "./globals.css";  

export const metadata = {
  title: "StarShop",
  description: "Empowering users to buy and sell unique digital assets on a blockchain-based marketplace, fostering transparency and trust through NFTs.",
  keywords: "NFT, Blockchain, Digital Assets, Marketplace",
  author: "StarShop Team",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-starshopBackground">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
