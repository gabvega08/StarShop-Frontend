'use client';

import { ExternalLink } from 'lucide-react';
import type { Transaction } from '../../../types/billing';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6">
        XLM Transaction History
      </h2>

      <div className="space-y-4">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor =
                'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.border = '1px solid transparent';
            }}
          >
            <div>
              <p className="text-white font-medium">{transaction.name}</p>
              <p className="text-gray-400 text-sm">{transaction.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">
                  {transaction.amount} XLM
                </p>
                <p className="text-green-400 text-sm">{transaction.status}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
