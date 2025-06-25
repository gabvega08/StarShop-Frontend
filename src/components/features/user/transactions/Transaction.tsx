"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

interface Transaction {
  id: string
  type: "payment" | "refund" | "transfer"
  amount: string
  currency: string
  date: string
  status: "completed" | "pending" | "failed"
  description: string
  transactionId: string
}

const mockTransactions: Transaction[] = [
  {
    id: "TX-001",
    type: "payment",
    amount: "85.00",
    currency: "XLM",
    date: "March 15, 2024",
    status: "completed",
    description: "Payment to Urban Style Store",
    transactionId: "GABC123...XYZ789"
  },
  {
    id: "TX-002",
    type: "payment",
    amount: "120.00",
    currency: "XLM",
    date: "March 10, 2024",
    status: "completed",
    description: "Payment to Sneaker Haven",
    transactionId: "GDEF456...UVW012"
  },
  {
    id: "TX-003",
    type: "refund",
    amount: "35.00",
    currency: "XLM",
    date: "March 8, 2024",
    status: "completed",
    description: "Refund from Graphic Tees Co.",
    transactionId: "GHIJ789...RST345"
  },
  {
    id: "TX-004",
    type: "payment",
    amount: "75.00",
    currency: "XLM",
    date: "March 1, 2024",
    status: "pending",
    description: "Payment to Tech Gadgets",
    transactionId: "GKLM012...OPQ678"
  }
]

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || transaction.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "failed":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return "↓"
      case "refund":
        return "↑"
      case "transfer":
        return "↔"
      default:
        return "•"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <p className="text-gray-400">View and manage your payment transactions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download size={16} />
          Export Transactions
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Completed
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={filter === "failed" ? "default" : "outline"}
            onClick={() => setFilter("failed")}
            size="sm"
          >
            Failed
          </Button>
        </div>
      </div>

      <div className="bg-[#0E0E1B] rounded-lg border border-white/10">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-semibold">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">{transaction.id} • {transaction.date}</p>
                    <p className="text-gray-500 text-xs">TX: {transaction.transactionId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {transaction.type === "refund" ? "+" : "-"}{transaction.amount} {transaction.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 