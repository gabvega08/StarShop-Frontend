import TransactionsHeader from './transactions-header';
import StatsGrid from './stats-grid';
import RecentTransactions from './recent-transactions';

export default function Transactions() {
  return (
    <div className="container mx-auto p-6">
      <TransactionsHeader />

      <StatsGrid />

      <RecentTransactions />
    </div>
  );
}
