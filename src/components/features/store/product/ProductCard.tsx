import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product, ViewMode } from "./types"

interface ProductCardProps {
  product: Product
  viewMode: ViewMode
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800",
        viewMode === "list" ? "flex" : "",
      )}
    >
      {/* Product Image with Status Badges */}
      <div className={cn("relative", viewMode === "list" ? "w-1/4" : "w-full h-40")}>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.status.includes("Featured") && (
            <Badge className="bg-purple-500/80 text-white text-xs py-0.5 px-2 h-5">Featured</Badge>
          )}
          {product.status.includes("Active") && (
            <Badge className="bg-green-500/80 text-white text-xs py-0.5 px-2 h-5">Active</Badge>
          )}
          {product.status.includes("Draft") && (
            <Badge className="bg-yellow-500/80 text-white text-xs py-0.5 px-2 h-5">Draft</Badge>
          )}
          {product.status.includes("Out of Stock") && (
            <Badge className="bg-red-500/80 text-white text-xs py-0.5 px-2 h-5">Out of Stock</Badge>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className={cn("p-3", viewMode === "list" ? "flex-1" : "")}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-sm">{product.name}</h3>
          <Badge variant="outline" className="bg-gray-800/50 text-white text-xs py-0 px-2 h-5">
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs">{product.rating > 0 ? product.rating.toFixed(1) : "Not rated yet"}</span>
          <span className="text-xs text-gray-400">{product.rating > 0 ? ` • ${product.stock} in stock` : ""}</span>
        </div>

        <p className="text-base font-semibold text-purple-400">{product.price} XLM</p>

        {product.status.includes("Draft") && product.rating === 0 && (
          <p className="text-xs text-gray-400 mt-1">Draft • Not rated yet</p>
        )}
      </div>
    </div>
  )
}
