interface TransactionItemProps {
    title: string
    date: string
    amount: string
    status: string
    positive?: boolean
    negative?: boolean
  }
  
  export default function TransactionItem({ title, date, amount, status, positive, negative }: TransactionItemProps) {
    return (
      <div className="bg-zinc-700 bg-opacity-30 border border-zinc-700 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-400">{date}</div>
          </div>
          <div className="text-right">
            <div className={`font-medium ${positive ? "text-green-400" : negative ? "text-white" : ""}`}>{amount}</div>
            <div className="text-sm text-green-400">{status}</div>
          </div>
        </div>
      </div>
    )
  }
  
  