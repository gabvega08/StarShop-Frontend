import { StatsCard } from './stats-card';

export default function StatsGrid() {
  const statsCards = [
    {
      title: 'Total Revenue',
      value: 12567.89,
      color: 'text-[#10B981]'
    },
    {
      title: 'Pending Payouts',
      value: 890.00,
      color: 'text-[#3B82F6]'
    },
    {
      title: 'Available Balance',
      value: 3456.78,
      color: '#A855F7'

    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <StatsCard
          key={index}
          {...card}
        />
      ))}
    </div>
  );
}
