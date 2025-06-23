"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Ticket } from "../types/ticket"
import { getStatusColor, getPriorityColor, getCategoryColor } from "../constants/colorMaps"

interface TicketRowProps {
  ticket: Ticket
  isLast: boolean
}

const TicketRow: React.FC<TicketRowProps> = ({ ticket, isLast }) => {
  return (
    <tr
      className={cn(
        "hover:bg-gray-700/30 transition-colors",
        !isLast && "border-b border-gray-700/30"
      )}
    >
      <td className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col w-24">
            <span className="text-sm font-semibold text-gray-200">{ticket.id}</span>
            <p className="text-xs text-gray-400">{ticket.date}</p>
          </div>

          <div className="flex-grow min-w-0">
            <span className="text-sm font-semibold text-gray-200 block mb-1">
              {ticket.title}
            </span>
            <div className="flex items-center space-x-2">
              <span className={getStatusColor(ticket.status)}>
                {ticket.status}
              </span>
              <span className={getPriorityColor(ticket.priority)}>
                {ticket.priority} Priority
              </span>
              <span className={getCategoryColor(ticket.category)}>
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
              <div className="text-gray-300 px-0.2 py-0.5 text-xs">
                {ticket.commentCount}
              </div>
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
  )
}

export default TicketRow 