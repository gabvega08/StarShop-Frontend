import type React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
}

export function StatsCard({
  title,
  value,
  color,
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-[FFFFFF01] shadow-[0_0_10px_0px_#FFFFFF33] hover:shadow-[0_0_14px_0px_#FFFFFF33] transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className={cn('text-gray-400 font-medium', color)}>{title}</h2>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>

    </div>
  );
}
