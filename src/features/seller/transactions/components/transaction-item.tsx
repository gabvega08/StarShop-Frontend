import type React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionItemProps {
  reference: string;
  description: string;
  amount: number;
  status: string;
  date: string;
  type: string;
}

export default function TransactionItem({
  reference,
  description,
  amount,
  status,
  date,
  type,
}: TransactionItemProps) {
  return (
    <div className="p-5 flex font-inter justify-between items-center rounded-lg bg-[#FFFFFF0D]">
      <div className="flex items-center gap-4">
        {type === 'credit' ? (
          <span className="bg-[#19282D]/50 p-3 rounded-lg">
            <ArrowDownLeft className="w-6 h-6 text-[#22C55E]" />
          </span>
        ) : (
          <span className="bg-[#EF44441A] p-3 rounded-lg">
            <ArrowUpRight className="w-6 h-6 text-[#EF4444]" />
          </span>
        )}
        <div>
          <h3 className="text-white font-medium">{description}</h3>
          <p className="text-[#FFFFFF99] text-sm">
            <span>{date}</span>
            <span className="mx-1 font-bold">•</span>
            <span>{reference}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`font-medium ${type === 'credit' ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}
          >
            {type === 'credit' ? '+' : '-'}
            {amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          <p className="text-[#FFFFFF99] text-sm font-inter">
            <span>{status}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
