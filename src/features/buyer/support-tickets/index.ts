// Main component
export { default as TicketsList } from "./components/tickets-list"

// Sub-components
export { default as TicketsTable } from "./components/tickets-table"
export { default as TicketRow } from "./components/ticket-row"
export { default as TicketsTabs } from "./components/tickets-tabs"
export { default as Pagination } from "./components/Pagination"

// Types
export type { Ticket, TicketStatus, TicketPriority, TicketCategory } from "./types/ticket"

// Constants
export { mockTickets } from "./constants/mock-data"
export { 
  statusColorMap, 
  priorityColorMap, 
  categoryColorMap,
  getStatusColor,
  getPriorityColor,
  getCategoryColor
} from "./constants/color-maps"

// Hooks
export { useTickets } from "./hooks/useTickets" 