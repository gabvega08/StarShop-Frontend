'use client';

import { Button } from '@/shared/components/ui/button';
import { ExternalLink } from 'lucide-react';

const valuableNfts = [
  {
    title: 'Early Adopter',
    subtitle: 'Special Edition',
    value: '~500 XLM',
    badge: { label: 'Legendary', color: 'bg-yellow-100 text-yellow-600' },
  },
  {
    title: 'Fashion Pioneer',
    subtitle: 'Achievement',
    value: '~350 XLM',
    badge: { label: 'Epic', color: 'bg-purple-100 text-purple-600' },
  },
  {
    title: 'Limited Collection #1',
    subtitle: 'Exclusive',
    value: '~200 XLM',
    badge: { label: 'Rare', color: 'bg-blue-100 text-blue-600' },
  },
  {
    title: 'Designer Collaboration',
    subtitle: 'Exclusive',
    value: '~450 XLM',
    badge: { label: 'Epic', color: 'bg-purple-100 text-purple-600' },
  },
];

export function ValuableCollection() {
  return (
    <section className="mb-12 border border-white/20 rounded-2xl p-6 bg-gradient-to-br from-[rgba(43,19,70,0.4)] via-[rgba(39,21,71,0.4)] via-[rgba(29,27,73,0.4)] to-[rgba(21, 36, 197, 0.4)]">
      <h2 className="text-2xl font-bold text-white mb-1">Valuable NFT Collection</h2>
      <p className="text-white/70 mb-6">Your most valuable NFTs that can be traded or sold on the Stellar marketplace.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {valuableNfts.map((nft, i) => (
          <div key={i} className="bg-white/5 border border-white/20 rounded-2xl overflow-hidden flex flex-col">
            <div className="relative h-32 bg-white">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl text-black/10 font-bold">NFT</span>
              </div>
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${nft.badge.color}`}>{nft.badge.label}</span>
            </div>
            <div className="bg-white/5 p-5 flex flex-col flex-1">
              <span className="text-white font-medium text-base mb-1">{nft.title}</span>
              <span className="text-white/50 text-sm mb-2">{nft.subtitle}</span>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-purple-300 text-base font-semibold">{nft.value}</span>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-black text-white border border-white/20 hover:bg-white/10 px-4 py-2 h-8 text-sm flex items-center gap-1 rounded-lg shadow-none"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="bg-black text-white border border-white/20 hover:bg-white/10 text-base font-semibold px-8 py-3 rounded-xl flex items-center gap-2">
          View Stellar NFT Trading Platform
          <ExternalLink className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
} 