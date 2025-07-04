'use client';

import { Card } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { NFT } from '../types/nft';
import { ExternalLink, Eye } from 'lucide-react';

const rarityMap: Record<string, { label: string; color: string }> = {
  'Clothing': { label: 'Uncommon', color: 'bg-green-100 text-green-600' },
  'Footwear': { label: 'Rare', color: 'bg-blue-100 text-blue-600' },
  'Accessories': { label: 'Epic', color: 'bg-purple-100 text-purple-600' },
};

export function NFTCard({ nft }: { nft: NFT }) {
  const rarity = rarityMap[nft.category] || { label: 'Common', color: 'bg-gray-100 text-gray-600' };
  return (
    <Card className="overflow-hidden bg-white/10 border border-white/20 rounded-2xl shadow-none">
      <div className="relative h-40 bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl text-black/10 font-bold">NFT</span>
        </div>
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${rarity.color}`}>{rarity.label}</span>
      </div>

      <div className=" p-5">
        <h3 className="font-semibold text-white text-lg mb-1">{nft.title}</h3>
        <Badge className="bg-blue-900/60 text-blue-200 text-xs font-medium mb-2">Purchase Reward</Badge>
        <div className="text-sm text-white/60 mb-1">{nft.store}</div>
        <div className="text-xs text-white/40 mb-4">Acquired: {new Date(nft.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1 bg-[#0E0E1B] border-white/20 text-white hover:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-white/20 bg-[#0E0E1B] text-white hover:bg-white/10">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Stellar
          </Button>
        </div>
      </div>
    </Card>
  );
} 