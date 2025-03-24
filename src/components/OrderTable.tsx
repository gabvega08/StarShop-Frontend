"use client"

import { useState } from "react"
import OrderCard from "@/components/OrderCard"
import { Truck, CheckCircle, Clock } from "lucide-react"

const orders = [
  {
    id: "ORD-8832",
    product: "Premium Hoodie (Black)",
    store: "Urban Style Store",
    date: "March 15, 2024",
    status: "In Transit",
    statusColor: "bg-blue-600/10 border border-blue-300/30",
    textColor: "text-blue-300",
    icon: <Truck size={14} className="mr-1" />,
    total: "85 XLM",
    eta: "March 18, 2024",
  },
  {
    id: "ORD-8831",
    product: "Urban Sneakers (Gray)",
    store: "Sneaker Haven",
    date: "March 10, 2024",
    status: "Delivered",
    textColor: "text-green-300",
    statusColor: "bg-green-600/10 border border-green-300/30",
    icon: <CheckCircle size={14} className="mr-1" />,
    total: "120 XLM",
    eta: "Delivered on March 12, 2024",
  },
  {
    id: "ORD-8830",
    product: "Graphic T-Shirt (White)",
    store: "Graphic Tees Co.",
    date: "March 5, 2024",
    status: "Delivered",
    textColor: "text-green-300",
    statusColor: "bg-green-600/10 border border-green-300/30",
    icon: <CheckCircle size={14} className="mr-1" />,
    total: "35 XLM",
    eta: "Delivered on March 8, 2024",
  },
  {
    id: "ORD-8829",
    product: "Wireless Earbuds",
    store: "Tech Gadgets",
    date: "March 1, 2024",
    status: "Processing",
    textColor: "text-yellow-300",
    statusColor: "bg-yellow-600/10 border border-yellow-300/30",
    icon: <Clock size={14} className="mr-1" />,
    total: "75 XLM",
    eta: "Ships in 24 hours",
  },
]

export default function OrderTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 4
  const totalPages = Math.ceil(orders.length / ordersPerPage)

  // Slice orders to show only the current page
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = orders.slice(startIndex, endIndex)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-4">
        <h2 className="text-white text-xl font-medium">Recent Orders</h2>
        <p className="text-gray-400 text-sm">
          Showing {currentOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* Orders List */}
      <div className="flex flex-col">
        {currentOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4 px-4">
        <span className="text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="text-white border rounded-md px-4 py-2 border-white/20 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <button
            className="text-white border rounded-md px-4 py-2 border-white/20 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

