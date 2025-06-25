"use client"

import { Edit, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StoreHeaderProps {
  storeName: string
  description: string
  rating: number
  reviewCount: number
  followerCount: number
  productCount: number
  avatar: string
  coverImage: string
}

const mockStoreData: StoreHeaderProps = {
  storeName: "Urban Style Store",
  description: "Premium streetwear and urban fashion for the modern lifestyle",
  rating: 4.8,
  reviewCount: 1247,
  followerCount: 15420,
  productCount: 89,
  avatar: "/images/store/1.jpg",
  coverImage: "/images/store/2.jpg"
}

export default function StoreHeader() {
  const { storeName, description, rating, reviewCount, followerCount, productCount, avatar, coverImage } = mockStoreData

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative overflow-hidden rounded-lg">
        <img
          src={coverImage}
          alt="Store Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Camera size={16} />
            Change Cover
          </Button>
        </div>
      </div>

      {/* Store Info */}
      <div className="relative -mt-16 px-6 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={avatar}
              alt="Store Avatar"
              className="w-32 h-32 rounded-full border-4 border-[#0E0E1B] object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
              <Camera size={16} className="text-white" />
            </button>
          </div>

          {/* Store Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl font-bold text-white">{storeName}</h1>
              <Button variant="outline" size="sm" className="flex items-center gap-2 w-fit">
                <Edit size={16} />
                Edit Store
              </Button>
            </div>
            
            <p className="text-gray-300 max-w-2xl">{description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{rating}</span>
                <span className="text-gray-400">({reviewCount} reviews)</span>
              </div>
              <div className="text-gray-400">
                <span className="text-white font-medium">{followerCount}</span> followers
              </div>
              <div className="text-gray-400">
                <span className="text-white font-medium">{productCount}</span> products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 