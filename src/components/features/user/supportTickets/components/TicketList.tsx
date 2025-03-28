"use client"

import type React from "react"
import { useState } from "react"
import { Search, MessageCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Types for Ticket
type TicketStatus = "Open" | "In Progress" | "Resolved"
type TicketPriority = "Low" | "Medium" | "High"
type TicketCategory = "Billing" | "Technical" | "Account"

interface Ticket {
  id: string
  date: string
  title: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  lastUpdated: string
  commentCount: number
}

// Mock data updated to match mockup
const mockTickets: Ticket[] = [
  {
    id: "TK-1234",
    date: "Mar 15, 2024",
    title: "Payment Processing Issue",
    status: "Open",
    priority: "High",
    category: "Billing",
    lastUpdated: "2 hours ago",
    commentCount: 3,
  },
  {
    id: "TK-1233",
    date: "Mar 14, 2024",
    title: "Product Upload Error",
    status: "In Progress",
    priority: "Medium",
    category: "Technical",
    lastUpdated: "1 day ago",
    commentCount: 5,
  },
  {
    id: "TK-1232",
    date: "Mar 13, 2024",
    title: "Store Settings Update",
    status: "In Progress",
    priority: "Low",
    category: "Account",
    lastUpdated: "2 days ago",
    commentCount: 2,
  },
  {
    id: "TK-1231",
    date: "Mar 12, 2024",
    title: "API Integration Help",
    status: "Resolved",
    priority: "Medium",
    category: "Technical",
    lastUpdated: "3 days ago",
    commentCount: 8,
  },
  {
    id: "TK-1230",
    date: "Mar 11, 2024",
    title: "Refund Request for Order #45678",
    status: "Open",
    priority: "High",
    category: "Billing",
    lastUpdated: "4 days ago",
    commentCount: 2,
  },
]

// Status color mapping
const statusColorMap = {
  Open: "bg-yellow-500/20 text-yellow-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  Resolved: "bg-green-500/20 text-green-400",
}

// Priority color mapping
const priorityColorMap = {
  Low: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  High: "bg-red-500/20 text-red-400",
}

const categoryColorMap = {
  Billing: "bg-purple-500/20 text-purple-400",
  Technical: "bg-blue-500/20 text-blue-400",
  Account: "bg-green-500/20 text-green-400",
}

const TicketsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter tickets based on search and active tab
  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && ticket.status === "Open") ||
      (activeTab === "in-progress" && ticket.status === "In Progress") ||
      (activeTab === "resolved" && ticket.status === "Resolved")

    return matchesSearch && matchesTab
  })

  function renderTicketsTable(tickets: Ticket[]) {
    return (
      <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                className={cn(
                  "hover:bg-gray-700/30 transition-colors",
                  index !== tickets.length - 1 && "border-b border-gray-700/30",
                )}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col w-24">
                      <span className="text-sm font-semibold text-gray-200">{ticket.id}</span>
                      <p className="text-xs text-gray-400">{ticket.date}</p>
                    </div>

                    <div className="flex-grow min-w-0">
                      <span className="text-sm font-semibold text-gray-200 block mb-1">{ticket.title}</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700/30",
                            statusColorMap[ticket.status],
                          )}
                        >
                          {ticket.status}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700/30",
                            priorityColorMap[ticket.priority],
                          )}
                        >
                          {ticket.priority} Priority
                        </span>
                        <span
                          className={cn("px-3 py-1 rounded-md text-xs font-medium", categoryColorMap[ticket.category])}
                        >
                          {ticket.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-400">
                      <div className="flex items-center text-xs">
                        <div className="mr-1 text-gray-500" />
                        {ticket.lastUpdated}
                      </div>
                      <div className="border border-gray-700/50 px-2 py-0.5 flex items-center rounded-full text-xs">
                        <MessageCircle className="mr-1 text-gray-500" size={14} />
                        <div className="text-gray-300 px-0.2 py-0.5 text-xs">{ticket.commentCount}</div>
                      </div>
                    </div>

                    <div className="text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-4xl">
        {" "}
        {/* Increased max-width */}
        <div className="flex items-center mb-6 space-x-4">
          {" "}
        </div>
        {/* Tabs */}
        <Tabs defaultValue="all" className="flex-shrink-0">
          <TabsList className="inline-flex bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-lg p-1 space-x-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
            >
              All <span className="ml-1.5 bg-purple-700 text-white rounded-full px-2 py-0.5 text-xs">24</span>
            </TabsTrigger>
            <TabsTrigger
              value="open"
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
            >
              Open <span className="ml-1.5 bg-yellow-600 text-white rounded-full px-2 py-0.5 text-xs">8</span>
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
            >
              In Progress <span className="ml-1.5 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">12</span>
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
            >
              Resolved <span className="ml-1.5 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs">4</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-grow">
            {renderTicketsTable(filteredTickets)}
          </TabsContent>
          <TabsContent value="open" className="flex-grow">
            {renderTicketsTable(filteredTickets.filter((t) => t.status === "Open"))}
          </TabsContent>
          <TabsContent value="in-progress" className="flex-grow">
            {renderTicketsTable(filteredTickets.filter((t) => t.status === "In Progress"))}
          </TabsContent>
          <TabsContent value="resolved" className="flex-grow">
            {renderTicketsTable(filteredTickets.filter((t) => t.status === "Resolved"))}
          </TabsContent>
        </Tabs>
        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
          <span>Showing 5 of 24 tickets</span>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-md hover:bg-gray-700/30">
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-md hover:bg-gray-700/30">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsList

