'use client';
import { Button } from '@/shared/components/ui/button';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

interface TransactionHistoryProps {
  transactions?: Transaction[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

export function TransactionHistory({
  transactions = [],
  isLoading = false,
  onViewAll,
}: TransactionHistoryProps) {
  const defaultTransactions: Transaction[] = [
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

  const displayTransactions =
    transactions.length > 0 ? transactions : defaultTransactions;

  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Transaction History
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg p-3 bg-white/5 animate-pulse"
            >
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-600 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayTransactions.map(transaction => (
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
                <div
                  className={`text-sm ${
                    transaction.status === 'Completed'
                      ? 'text-green-400'
                      : transaction.status === 'Pending'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }`}
                >
                  {transaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={onViewAll}
          disabled={isLoading}
        >
          View All Transactions
        </Button>
      </div>
    </div>
  );
}
