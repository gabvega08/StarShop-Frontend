"use client"

import { useState } from "react"
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

interface Product {
  id: string
  name: string
  description: string
  price: string
  currency: string
  category: string
  status: "active" | "inactive" | "draft"
  stock: number
  image: string
  createdAt: string
}

const mockProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Premium Hoodie (Black)",
    description: "High-quality cotton hoodie with premium finish",
    price: "85.00",
    currency: "XLM",
    category: "Clothing",
    status: "active",
    stock: 25,
    image: "/images/dashboard/HoodieFrontpng1.png",
    createdAt: "March 15, 2024"
  },
  {
    id: "PROD-002",
    name: "Urban Sneakers (Gray)",
    description: "Comfortable urban sneakers for daily wear",
    price: "120.00",
    currency: "XLM",
    category: "Footwear",
    status: "active",
    stock: 15,
    image: "/images/dashboard/FrontJoggersBlack1.png",
    createdAt: "March 10, 2024"
  },
  {
    id: "PROD-003",
    name: "Graphic T-Shirt (White)",
    description: "Classic white t-shirt with custom graphics",
    price: "35.00",
    currency: "XLM",
    category: "Clothing",
    status: "active",
    stock: 50,
    image: "/images/dashboard/T-ShirtOversize.png",
    createdAt: "March 5, 2024"
  },
  {
    id: "PROD-004",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    price: "75.00",
    currency: "XLM",
    category: "Electronics",
    status: "draft",
    stock: 0,
    image: "/images/dashboard/T-ShirtOversize2.png",
    createdAt: "March 1, 2024"
  }
]

export function ProductCatalogGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "draft">("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filter === "all" || product.status === filter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "inactive":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "draft":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-400"
    if (stock < 10) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog</h1>
          <p className="text-gray-400">Manage your store products and inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={filter === "inactive" ? "default" : "outline"}
            onClick={() => setFilter("inactive")}
            size="sm"
          >
            Inactive
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
            size="sm"
          >
            Draft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#0E0E1B] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="aspect-square bg-gray-800 rounded-t-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{product.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ml-2 ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-semibold">{product.price} {product.currency}</span>
                <span className={`${getStockColor(product.stock)}`}>
                  {product.stock} in stock
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{product.category}</span>
                <span>{product.createdAt}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Eye size={14} className="mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No products found matching your criteria</p>
        </div>
      )}
    </div>
  )
} 