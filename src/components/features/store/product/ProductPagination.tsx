"use client"

import { Button } from "@/components/ui/button"

interface ProductPaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  indexOfFirstProduct: number
  indexOfLastProduct: number
  totalProducts: number
}

export function ProductPagination({
  currentPage,
  setCurrentPage,
  totalPages,
  indexOfFirstProduct,
  indexOfLastProduct,
  totalProducts,
}: ProductPaginationProps) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-400">
      <div>
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} products
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-gray-900/50 border-gray-700 text-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-gray-900/50 border-gray-700 text-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
