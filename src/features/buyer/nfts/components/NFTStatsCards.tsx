'use client';

import { Card } from '@/shared/components/ui/card';
import { NFTStats } from '../types/nft';
import { Gem, Shirt, Ticket, DollarSign } from 'lucide-react';

interface NFTStatsCardsProps {
  stats: NFTStats[];
}

const getIcon = (iconName: string, color: string) => {
  const iconProps = { className: `w-6 h-6 ${color}` };
  switch (iconName) {
    case 'Gem':
      return <Gem {...iconProps} />;
    case 'Shirt':
      return <Shirt {...iconProps} />;
    case 'Ticket':
      return <Ticket {...iconProps} />;
    case 'DollarSign':
      return <DollarSign {...iconProps} />;
    default:
      return <Gem {...iconProps} />;
  }
};

export function NFTStatsCards({ stats }: NFTStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 bg-transparent border border-white/20 backdrop-blur-sm shadow-none">
          <div className="flex items-center gap-4">
            {getIcon(stat.icon, stat.color)}
            <div>
              <p className="text-sm text-white/80 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 