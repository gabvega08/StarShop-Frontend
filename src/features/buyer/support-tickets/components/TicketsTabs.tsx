"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket } from "../types/ticket"
import TicketsTable from "./TicketsTable"

interface TicketsTabsProps {
  tickets: Ticket[]
  activeTab: string
  onTabChange: (value: string) => void
}

const TicketsTabs: React.FC<TicketsTabsProps> = ({ tickets, activeTab, onTabChange }) => {
  const getFilteredTickets = (status?: string) => {
    if (!status) return tickets
    return tickets.filter((ticket) => ticket.status === status)
  }

  const getTicketCount = (status?: string) => {
    return getFilteredTickets(status).length
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="flex-shrink-0">
      <TabsList className="inline-flex bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-lg p-1 space-x-1">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
        >
          All <span className="ml-1.5 bg-purple-700 text-white rounded-full px-2 py-0.5 text-xs">
            {getTicketCount()}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="open"
          className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
        >
          Open <span className="ml-1.5 bg-yellow-600 text-white rounded-full px-2 py-0.5 text-xs">
            {getTicketCount("Open")}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="in-progress"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
        >
          In Progress <span className="ml-1.5 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
            {getTicketCount("In Progress")}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="resolved"
          className="data-[state=active]:bg-green-600 data-[state=active]:text-white bg-transparent text-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center"
        >
          Resolved <span className="ml-1.5 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs">
            {getTicketCount("Resolved")}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="flex-grow">
        <TicketsTable tickets={getFilteredTickets()} />
      </TabsContent>
      <TabsContent value="open" className="flex-grow">
        <TicketsTable tickets={getFilteredTickets("Open")} />
      </TabsContent>
      <TabsContent value="in-progress" className="flex-grow">
        <TicketsTable tickets={getFilteredTickets("In Progress")} />
      </TabsContent>
      <TabsContent value="resolved" className="flex-grow">
        <TicketsTable tickets={getFilteredTickets("Resolved")} />
      </TabsContent>
    </Tabs>
  )
}

export default TicketsTabs 