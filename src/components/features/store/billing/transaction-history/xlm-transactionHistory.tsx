import TransactionItem from "./components/xlm-transactionItem"

interface Transaction {
  title: string
  date: string
  amount: string
  status: "Confirmed" | "Pending" | "Failed"
}

const transactions: Transaction[] = [
  {
    title: "Premium Store Subscription",
    date: "Mar 1, 2024",
    amount: "50 XLM",
    status: "Confirmed",
  },
  {
    title: "Premium Store Subscription",
    date: "Feb 1, 2024",
    amount: "50 XLM",
    status: "Confirmed",
  },
  {
    title: "Premium Store Subscription",
    date: "Jan 1, 2024",
    amount: "50 XLM",
    status: "Confirmed",
  },
]

export default function TransactionHistory() {
  return (
    <div className="pt-10">

      <div className="mx-auto max-w-3xl bg-transparent border border-white/20 shadow-[0px_2px_8px_2px_rgba(255,255,255,0.15)] p-4 rounded-lg">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 text-white">XLM Transaction History</h1>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </div>
      </div>

    </div>
  )
}

