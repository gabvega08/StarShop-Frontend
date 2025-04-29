"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"

interface ProductSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ProductSearch({ searchQuery, setSearchQuery }: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 h-8 bg-gray-900/50 border-gray-700 text-white text-sm placeholder:text-gray-500 focus-visible:ring-purple-500"
      />
    </div>
  )
}
