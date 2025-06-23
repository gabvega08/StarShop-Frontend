"use client"

import { useState, useMemo } from "react"
import { Ticket } from "../types/ticket"

interface UseTicketsProps {
  tickets: Ticket[]
}

export const useTickets = ({ tickets }: UseTicketsProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter tickets based on search and active tab
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
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
  }, [tickets, searchTerm, activeTab])

  // Paginate tickets
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTickets.slice(startIndex, endIndex)
  }, [filteredTickets, currentPage, itemsPerPage])

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    const maxPage = Math.ceil(filteredTickets.length / itemsPerPage)
    setCurrentPage((prev) => Math.min(prev + 1, maxPage))
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    currentPage,
    filteredTickets,
    paginatedTickets,
    itemsPerPage,
    handlePrevious,
    handleNext,
    handleTabChange,
  }
} 