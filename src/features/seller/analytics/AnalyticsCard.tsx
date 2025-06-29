import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  changePercentage: number;
  target: string | number;
  achievedPercentage: number;
  iconBgColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  changePercentage,
  target,
  achievedPercentage,
  iconBgColor,
}) => {
  return (
    <div className="mt-6 p-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-custom-card-background">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white/60 text-sm">{title}</h3>
            <p className="text-3xl font-semibold mt-1 text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${iconBgColor} bg-opacity-20`}>
            {icon}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm inline-flex ${changePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {changePercentage >= 0 ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}{' '}
            {Math.abs(changePercentage)}% from last period
          </span>
        </div>

        <div className="space-y-2">
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${iconBgColor}`}
              style={{ width: `${achievedPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Target: {target}</span>
            <span>{achievedPercentage}% achieved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
