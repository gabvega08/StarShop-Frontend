import TransactionSummary from "./components/TransactionSummary";
import TransactionItem from "./components/TransactionItem";

interface TransactionItemProps {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: string;
  type: "income" | "expense";
}

const transactions: TransactionItemProps[] = [
  {
    id: "TX123456",
    title: "Order #8832 - Premium Hoodie",
    date: "Mar 15, 2024",
    amount: 156.0,
    status: "Completed",
    type: "income",
  },
  {
    id: "TX123455",
    title: "Weekly Payout",
    date: "Mar 14, 2024",
    amount: -890.0,
    status: "Processing",
    type: "expense",
  },
  {
    id: "TX123454",
    title: "Order #8831 - Urban Pants",
    date: "Mar 13, 2024",
    amount: 89.99,
    status: "Completed",
    type: "income",
  },
  {
    id: "TX123453",
    title: "Order #8830 - Limited Sneakers",
    date: "Mar 12, 2024",
    amount: 129.99,
    status: "Completed",
    type: "income",
  },
  {
    id: "TX123452",
    title: "Weekly Payout",
    date: "Mar 11, 2024",
    amount: -750.0,
    status: "Completed",
    type: "expense",
  },
];

const Transactions = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-white text-left">
          Transactions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <TransactionSummary
            title="Total Revenue"
            amount={12567.89}
            color="text-green-400"
          />
          <TransactionSummary
            title="Pending Payouts"
            amount={890.0}
            color="text-blue-400"
          />
          <TransactionSummary
            title="Available Balance"
            amount={3456.78}
            color="text-purple-400"
          />
        </div>

        <div className="bg-transparent border border-white/20 shadow-[0px_2px_8px_2px_rgba(255,255,255,0.15)] p-4 rounded-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} {...tx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
