"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortOption } from "./types"

interface ProductSortDropdownProps {
  sortOption: SortOption
  setSortOption: (option: SortOption) => void
}

export function ProductSortDropdown({ sortOption, setSortOption }: ProductSortDropdownProps) {
  const sortOptions: SortOption[] = ["Newest", "Price: Low to High", "Price: High to Low", "Rating"]

  return (
    <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
      <SelectTrigger className="w-[140px] h-8 text-xs bg-gray-900/50 border-gray-700">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option} value={option} className="text-xs">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
