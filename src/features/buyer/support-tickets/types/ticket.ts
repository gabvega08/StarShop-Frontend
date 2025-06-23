export type TicketStatus = "Open" | "In Progress" | "Resolved"
export type TicketPriority = "Low" | "Medium" | "High"
export type TicketCategory = "Billing" | "Technical" | "Account"

export interface Ticket {
  id: string
  date: string
  title: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  lastUpdated: string
  commentCount: number
} 