"use client"

import { Ticket } from "../types/ticket"
import TicketRow from "./TicketRow"

interface TicketsTableProps {
  tickets: Ticket[]
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
  return (
    <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg overflow-hidden">
      <table className="w-full">
        <tbody>
          {tickets.map((ticket, index) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              isLast={index === tickets.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketsTable 