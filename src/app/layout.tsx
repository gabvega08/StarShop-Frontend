import { Metadata } from 'next';
import ReactQueryProvider from '@/provider/query-client-provider';
import { Background } from '@/shared/components/ui/background';
import './globals.css';

export const metadata: Metadata = {
  title: 'StarShop',
  description:
    'Empowering users to buy and sell unique digital assets on a blockchain-based marketplace, fostering transparency and trust through NFTs.',
  keywords: 'NFT, Blockchain, Digital Assets, Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {/* StarShop Starfield Background - matches your PNG exactly */}
        <Background 
          variant="starfield"
          starDensity="medium"
          opacity={1}
          // Optional: Enable twinkling animation
          // animated={true}
        />
        
        <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
          <main className="flex-1 overflow-y-auto">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}