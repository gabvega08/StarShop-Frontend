import { Button } from "@/components/ui/button"
import CardContainer from "./card-container"
import TransactionItem from "./transaction-item"

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      title: "Premium Hoodie Purchase",
      date: "Mar 15, 2024",
      amount: "-85 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 2,
      title: "Added Funds to Wallet",
      date: "Mar 10, 2024",
      amount: "+200 XLM",
      status: "Completed",
      positive: true,
    },
    {
      id: 3,
      title: "Urban Sneakers Purchase",
      date: "Mar 5, 2024",
      amount: "-120 XLM",
      status: "Completed",
      negative: true,
    },
    {
      id: 4,
      title: "Monthly Subscription",
      date: "Feb 28, 2024",
      amount: "-25 XLM",
      status: "Completed",
      negative: true,
    },
  ]

  return (
    <CardContainer title="Transaction History">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            date={transaction.date}
            amount={transaction.amount}
            status={transaction.status}
            positive={transaction.positive}
            negative={transaction.negative}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" className="text-gray-400 ">
          View All Transactions
        </Button>
      </div>
    </CardContainer>
  )
}

