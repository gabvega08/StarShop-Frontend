import { Metadata } from "next";
import ReactQueryProvider from "@/providers/query-client-provider";
import "./globals.css";
import { SidebarConditional } from "@/components/ui/SidebarConditional";
import { AuthProvider } from "@/context/AuthProvider";
import NavigationGuard from "@/components/auth/NavigationGuard";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { LanguageSwitcherWrapper } from "@/components/LanguageSwitcherWrapper";

export const metadata: Metadata = {
  title: "StarShop",
  description:
    "Empowering users to buy and sell unique digital assets on a blockchain-based marketplace, fostering transparency and trust through NFTs.",
  keywords: "NFT, Blockchain, Digital Assets, Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-starshopBackground overflow-x-hidden">
        <AuthProvider>
          <I18nProvider>
            <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
              <SidebarConditional />
              <main className="flex-1 overflow-y-auto">
                <LanguageSwitcherWrapper />
                <NavigationGuard>
                  <ReactQueryProvider>{children}</ReactQueryProvider>
                </NavigationGuard>
              </main>
            </div>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
