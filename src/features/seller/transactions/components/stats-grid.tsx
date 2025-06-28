import { StatsCard } from './stats-card';
import type { StatsCardData } from '@/types/seller';

export default function StatsGrid() {
  const statsCards: StatsCardData[] = [
    {
      title: 'Total Revenue',
      value: 12567.89,
      textColor: 'text-[#10B981]',
    },
    {
      title: 'Pending Payouts',
      value: 890.0,
      textColor: 'text-[#3B82F6]',
    },
    {
      title: 'Available Balance',
      value: 3456.78,
      textColor: 'text-[#A855F7]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map(card => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
}
