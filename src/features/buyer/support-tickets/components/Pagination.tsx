"use client"

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPrevious: () => void
  onNext: () => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPrevious,
  onNext,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  const hasPrevious = currentPage > 1
  const hasNext = endItem < totalItems

  return (
    <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
      <span>Showing {startItem} to {endItem} of {totalItems} tickets</span>
      <div className="space-x-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="px-3 py-1 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-md hover:bg-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="px-3 py-1 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-md hover:bg-gray-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination 