import type React from 'react';
import { BuyerSidebar } from '@/features/buyer/components/buyer-sidebar';
export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-starshopBackground min-h-screen">
      <BuyerSidebar />
      <main className="flex-1 bg-starshopBackground pl-64">{children}</main>
    </div>
  );
}
