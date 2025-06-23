// Main component
export { default as TicketsList } from "./components/TicketsList"

// Sub-components
export { default as TicketsTable } from "./components/TicketsTable"
export { default as TicketRow } from "./components/TicketRow"
export { default as TicketsTabs } from "./components/TicketsTabs"
export { default as Pagination } from "./components/Pagination"

// Types
export type { Ticket, TicketStatus, TicketPriority, TicketCategory } from "./types/ticket"

// Constants
export { mockTickets } from "./constants/mockData"
export { 
  statusColorMap, 
  priorityColorMap, 
  categoryColorMap,
  getStatusColor,
  getPriorityColor,
  getCategoryColor
} from "./constants/colorMaps"

// Hooks
export { useTickets } from "./hooks/useTickets" 