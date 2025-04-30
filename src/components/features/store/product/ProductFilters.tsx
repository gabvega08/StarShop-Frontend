"use client"

import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FilterChip, ProductStatus } from "./types"

interface ProductFiltersProps {
  activeStatus: ProductStatus
  setActiveStatus: (status: ProductStatus) => void
  filterChips: FilterChip[]
  removeFilterChip: (chip: FilterChip) => void
  addFilter: () => void
}

export function ProductFilters({
  activeStatus,
  setActiveStatus,
  filterChips,
  removeFilterChip,
  addFilter,
}: ProductFiltersProps) {
  const statusOptions: ProductStatus[] = ["All Products", "Active", "Draft", "Out of Stock"]

  return (
    <div className="mb-3">
      {/* Status Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-2 gap-2">
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-lg text-sm h-8 px-4 whitespace-nowrap",
              activeStatus === status
                ? status === "All Products"
                  ? "bg-purple-600 text-white"
                  : status === "Active"
                    ? "bg-green-600 text-white"
                    : status === "Draft"
                      ? "bg-yellow-600 text-white"
                      : "bg-red-600 text-white"
                : "bg-gray-900/50 text-gray-400",
            )}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 items-center">
        {filterChips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-gray-900/50 text-white text-xs py-1 px-2 rounded-md border border-gray-700"
          >
            <span className="text-gray-400">{chip.type}:</span> {chip.value}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-white hover:bg-transparent"
              onClick={() => removeFilterChip(chip)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove filter</span>
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-xs bg-gray-900/50 border-gray-700 text-gray-400"
          onClick={addFilter}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Filter
        </Button>
      </div>
    </div>
  )
}
