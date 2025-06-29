import type React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-custom-card-background shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-400 font-medium">{title}</h2>
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p
            className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
          >
            {change} from last month
          </p>
        </div>
        <div
          className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
        >
          <TrendingUp
            className={`w-4 h-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
          />
        </div>
      </div>
    </div>
  );
}
