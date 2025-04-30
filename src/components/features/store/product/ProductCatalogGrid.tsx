"use client"

import { useState } from "react"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { ProductFilters } from "./ProductFilters"
import { ProductSearch } from "./ProductSearch"
import { ProductSortDropdown } from "./ProductSortDropdown"
import { ProductCard } from "./ProductCard"
import { ProductPagination } from "./ProductPagination"
import type { FilterChip, ProductStatus, SortOption, ViewMode } from "./types"
import { sampleProducts } from "./data"

export default function ProductCatalogGrid() {
  const [activeStatus, setActiveStatus] = useState<ProductStatus>("All Products")
  const [sortOption, setSortOption] = useState<SortOption>("Newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterChips, setFilterChips] = useState<FilterChip[]>([
    { type: "Category", value: "Clothing" },
    { type: "Price", value: "> 50 XLM" },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerRow, setCardsPerRow] = useState("4") // Default to 4 cards per row
  const productsPerPage = 8

  // Filter products based on active filters
  const filteredProducts = sampleProducts.filter((product) => {
    // Filter by status
    if (activeStatus !== "All Products" && !product.status.includes(activeStatus as any)) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by filter chips
    for (const chip of filterChips) {
      if (chip.type === "Category" && product.category !== chip.value) {
        return false
      }
      if (chip.type === "Price" && chip.value === "> 50 XLM" && product.price <= 50) {
        return false
      }
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Rating":
        return b.rating - a.rating
      case "Newest":
      default:
        return 0 // Assuming the array is already in "newest" order
    }
  })

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  // Handle filter chip removal
  const removeFilterChip = (chipToRemove: FilterChip) => {
    setFilterChips(
      filterChips.filter((chip) => !(chip.type === chipToRemove.type && chip.value === chipToRemove.value)),
    )
  }

  // Handle add filter (simplified for demo)
  const addFilter = () => {
    // In a real app, this would open a modal or dropdown to select filter type and value
    alert("In a real app, this would open a filter selection UI")
  }

  // Get grid columns class based on cardsPerRow setting
  const getGridColumnsClass = () => {
    if (viewMode === "list") return "grid-cols-1"

    switch (cardsPerRow) {
      case "2":
        return "grid-cols-1 sm:grid-cols-2"
      case "3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case "4":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      case "5":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      case "6":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    }
  }

  return (
    <div className="flex flex-col w-full text-white p-2 md:p-4">
      {/* Status Tabs */}
      <ProductFilters
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        filterChips={filterChips}
        removeFilterChip={removeFilterChip}
        addFilter={addFilter}
      />

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row justify-between gap-2 mb-3">
        <div className="flex-1">
          <ProductSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex gap-2 items-center">
          {/* Cards per row selector */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-gray-400">Cards per row:</span>
            <Select value={cardsPerRow} onValueChange={setCardsPerRow}>
              <SelectTrigger className="w-16 h-8 text-xs bg-gray-900/50 border-gray-700">
                <SelectValue placeholder="4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Dropdown */}
          <ProductSortDropdown sortOption={sortOption} setSortOption={setSortOption} />

          {/* View Toggle */}
          <div className="flex rounded-md overflow-hidden">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-r-none border-r-0 h-8 w-8",
                viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-900/50 border-gray-700 text-gray-400",
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-l-none h-8 w-8",
                viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-900/50 border-gray-700 text-gray-400",
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={cn("grid gap-3 mb-4", getGridColumnsClass())}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Pagination */}
      <ProductPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
        totalProducts={sortedProducts.length}
      />
    </div>
  )
}
