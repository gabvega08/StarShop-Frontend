'use client';

import { Gift, Ticket } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

const purchaseRewards = [
  {
    title: 'Limited Edition Hoodie NFT',
    value: '~120 XLM',
  },
  {
    title: 'Designer Sneakers NFT',
    value: '~85 XLM',
  },
];

const coupons = [
  {
    title: '25% Off Next Purchase',
    subtitle: 'Valid until Apr 15, 2024',
    status: 'Ready to use',
    statusColor: 'text-green-400',
    button: 'View',
  },
  {
    title: 'Early Access: Summer Collection',
    subtitle: 'Unlocks May 1, 2024',
    status: 'Coming soon',
    statusColor: 'text-yellow-400',
    button: 'View',
  },
];

export function ExclusiveRewards() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-1">Exclusive NFT Rewards</h2>
      <p className="text-white/70 mb-6">Collect exclusive NFTs by purchasing clothing items, redeem special coupons, and earn valuable digital assets.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchase Rewards */}
        <div className="bg-white/5 border border-white/20 rounded-2xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-semibold text-white">Purchase Rewards</span>
          </div>
          <p className="text-white/60 text-sm mb-5">Earn exclusive NFTs with every clothing purchase. The more you shop, the rarer the NFTs you'll collect.</p>
          <div className="flex gap-4 mb-6">
            {purchaseRewards.map((reward, i) => (
              <div key={i} className="flex-1 bg-white/10 min-h-48 rounded-xl p-3 flex flex-col">
                <div className="bg-white rounded-lg h-32 mb-3" />
                <span className="text-white font-medium text-sm mb-1">{reward.title}</span>
                <span className="text-purple-300 text-sm">{reward.value}</span>
              </div>
            ))}
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold py-2 rounded-md mt-auto">View Upcoming Rewards</Button>
        </div>
        {/* NFT Coupons & Vouchers */}
        <div className="bg-white/5 border border-white/20 rounded-2xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold text-white">NFT Coupons & Vouchers</span>
          </div>
          <p className="text-white/60 text-sm mb-5">Redeem these special NFT coupons for discounts, exclusive access to drops, and special offers.</p>
          <div className="flex flex-col gap-3 mb-6">
            {coupons.map((coupon, i) => (
              <div key={i} className="flex items-center justify-between min-h-24 bg-transparent rounded-xl px-4 py-3 border-2 border-dashed border-white">
                <div>
                  <div className="text-white font-medium text-sm mb-1">{coupon.title}</div>
                  <div className="text-xs text-white/40">{coupon.subtitle}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-semibold ${coupon.statusColor}`}>{coupon.status}</span>
                  <Button variant="ghost" className="text-white/80 px-3 py-1 h-auto text-xs">{coupon.button}</Button>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 rounded-md mt-auto">Redeem Coupon</Button>
        </div>
      </div>
    </section>
  );
} 