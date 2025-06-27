'use client';
import { Button } from '@/shared/components/ui/button';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export function TransactionHistory() {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'Premium Hoodie Purchase',
      amount: '-85 XLM',
      date: 'Mar 15, 2024',
      status: 'Completed',
    },
    {
      id: '2',
      type: 'Added Funds to Wallet',
      amount: '+200 XLM',
      date: 'Mar 10, 2024',
      status: 'Completed',
    },
    {
      id: '3',
      type: 'Urban Sneakers Purchase',
      amount: '-120 XLM',
      date: 'Mar 5, 2024',
      status: 'Completed',
    },
    {
      id: '4',
      type: 'Monthly Subscription',
      amount: '-25 XLM',
      date: 'Feb 28, 2024',
      status: 'Completed',
    },
  ];

  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Transaction History
      </h2>

      <div className="space-y-4">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-lg p-3 bg-white/5"
          >
            <div className="flex-1">
              <div className="text-white font-medium mb-1">
                {transaction.type}
              </div>
              <div className="text-gray-400 text-sm">{transaction.date}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">
                {transaction.amount}
              </div>
              <div className="text-green-400 text-sm">{transaction.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-gray-800"
        >
          View All Transactions
        </Button>
      </div>
    </div>
  );
}
