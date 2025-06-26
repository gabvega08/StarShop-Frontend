import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import { DollarSign, ShoppingCart, Percent, Users } from 'lucide-react';

const AnalyticsSummary: React.FC = () => {
  const analyticsData = [
    {
      title: 'Total Revenue',
      value: '$24,780',
      icon: <DollarSign className="w-6 h-6 text-purple-400" />,
      changePercentage: 12.5,
      target: '$38,000',
      achievedPercentage: 65,
      iconBgColor: 'bg-purple-600',
    },
    {
      title: 'Total Orders',
      value: '1,482',
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      changePercentage: 8.2,
      target: '1,900',
      achievedPercentage: 78,
      iconBgColor: 'bg-blue-600',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: <Percent className="w-6 h-6 text-green-400" />,
      changePercentage: -0.5,
      target: '5.0%',
      achievedPercentage: 64,
      iconBgColor: 'bg-green-600',
    },
    {
      title: 'Total Visitors',
      value: '46,927',
      icon: <Users className="w-6 h-6 text-amber-400" />,
      changePercentage: 18.3,
      target: '55,000',
      achievedPercentage: 85,
      iconBgColor: 'bg-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {analyticsData.map((data, index) => (
        <AnalyticsCard
          key={index}
          title={data.title}
          value={data.value}
          icon={data.icon}
          changePercentage={data.changePercentage}
          target={data.target}
          achievedPercentage={data.achievedPercentage}
          iconBgColor={data.iconBgColor}
        />
      ))}
    </div>
  );
};

export default AnalyticsSummary;
