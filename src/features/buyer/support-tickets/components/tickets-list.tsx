"use client"

import { useTickets } from "../hooks/useTickets"
import { mockTickets } from "../constants/mock-data"
import TicketsTabs from "./tickets-tabs"
import Pagination from "./Pagination"

const TicketsList: React.FC = () => {
  const {
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
  } = useTickets({ tickets: mockTickets })

  return (
    <div className="w-full h-screen flex items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-6 space-x-4">
          {/* Search functionality can be added here if needed */}
        </div>
        
        <TicketsTabs
          tickets={paginatedTickets}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTickets.length}
          itemsPerPage={itemsPerPage}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}

export default TicketsList 