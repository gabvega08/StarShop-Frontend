import TransactionItem from './transaction-item';

export default function RecentTransactions() {
  interface Transaction {
    reference: string;
    description: string;
    amount: number;
    status: string;
    date: string;
    type: 'credit' | 'debit';
  }

  const transactions: Transaction[] = [
    {
      reference: 'TX123456',
      description: 'Order #8832 - Premium Hoodie',
      amount: 156.0,
      status: 'Completed',
      date: 'Mar 15, 2024',
      type: 'credit',
    },
    {
      reference: 'TX123455',
      description: 'Weekly Payout',
      amount: 890.0,
      status: 'Processing',
      date: 'Mar 14, 2024',
      type: 'debit',
    },
    {
      reference: 'TX123454',
      description: 'Order #8831 - Urban Pants',
      amount: 89.99,
      status: 'Completed',
      date: 'Mar 13, 2024',
      type: 'credit',
    },
    {
      reference: 'TX123453',
      description: 'Order #8830 - Limited Sneakers',
      amount: 129.99,
      status: 'Completed',
      date: 'Mar 12, 2024',
      type: 'credit',
    },
    {
      reference: 'TX123452',
      description: 'Weekly Payout',
      amount: 750.0,
      status: 'Completed',
      date: 'Mar 11, 2024',
      type: 'debit',
    },
  ];

  return (
    <div className="rounded-lg p-6 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-[#FFFFFF01]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-medium">Recent Transactions</h3>
      </div>
      <div className="flex flex-col gap-4">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.reference} {...transaction} />
        ))}
      </div>
    </div>
  );
}
