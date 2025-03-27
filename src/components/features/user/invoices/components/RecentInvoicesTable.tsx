"use client"
import { CheckCircle, Clock, AlertCircle, Eye, Download, ChevronDown } from "lucide-react"

const RecentInvoicesTable = () => {
  // Sample invoice data
  const invoices = [
    {
      id: "INV-2024-001",
      item: "Premium Hoodie (Black)",
      store: "Urban Style Store",
      date: "March 15, 2024",
      amount: "85",
      status: "Paid",
      statusColor: "green",
    },
    {
      id: "INV-2024-002",
      item: "Urban Sneakers (Gray)",
      store: "Sneaker Haven",
      date: "March 10, 2024",
      amount: "120",
      status: "Paid",
      statusColor: "green",
    },
    {
      id: "INV-2024-003",
      item: "Wireless Earbuds",
      store: "Tech Gadgets",
      date: "March 5, 2024",
      amount: "75",
      status: "Pending",
      statusColor: "yellow",
    },
    {
      id: "INV-2024-004",
      item: "Sustainable Water Bottle",
      store: "Eco Friendly Shop",
      date: "February 28, 2024",
      amount: "25",
      status: "Overdue",
      statusColor: "red",
    },
  ]

  // Function to render status icon based on status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle size={20} className="text-green-400" />
      case "Pending":
        return <Clock size={20} className="text-yellow-400" />
      case "Overdue":
        return <AlertCircle size={20} className="text-red-400" />
      default:
        return null
    }
  }

  // Function to determine background color for status indicator
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20"
      case "Pending":
        return "bg-yellow-500/20"
      case "Overdue":
        return "bg-red-500/20"
      default:
        return "bg-gray-500/20"
    }
  }

  // Function to get text color based on status
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-400"
      case "Pending":
        return "text-yellow-400"
      case "Overdue":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="font-inter">
      <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700" style={{ borderColor: "#FFFFFF4D", borderWidth: "1px" }}>
        <h2 className="text-2xl font-semibold text-white mb-6">Recent Invoices</h2>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(168, 85, 247, 0.1)"
                e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                e.currentTarget.style.border = "1px solid transparent"
              }}
            >
              <div className="flex items-start md:items-center gap-4 mb-4 md:mb-0">
                <div
                  className={`w-10 h-10 flex items-center justify-center ${getStatusBgColor(invoice.status)} rounded-lg shrink-0`}
                >
                  {renderStatusIcon(invoice.status)}
                </div>
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-white font-medium text-lg">{invoice.item}</p>
                    <span className="text-gray-400 text-sm">{invoice.id}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {invoice.store} • {invoice.date}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 md:gap-10">
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">{invoice.amount} XLM</p>
                  <p className={getStatusTextColor(invoice.status)}>{invoice.status}</p>
                </div>
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Eye size={20} />
                    <span className="sm:inline">View</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Download size={20} />
                    <span className="sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="py-3 px-6 bg-transparent text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-white/5" style={{ borderColor: "#FFFFFF4D", borderWidth: "1px" }}>
            Load More Invoices
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecentInvoicesTable

