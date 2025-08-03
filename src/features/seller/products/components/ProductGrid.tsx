'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

function getStatusColor(status: Product['status']) {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'draft':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'out-of-stock':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

function getStatusText(status: Product['status']) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'draft':
      return 'Draft';
    case 'out-of-stock':
      return 'Out of Stock';
    default:
      return status;
  }
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (viewMode === 'list') {
    // List view implementation would go here
    return (
      <div className="space-y-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-gray-900 rounded-lg p-4 border border-gray-800 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.category}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">
                {product.price} {product.currency}
              </div>
              <div className="text-sm text-gray-400">
                {product.stock} in stock
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-white/5 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
              >
                {getStatusText(product.status)}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-white mb-1">{product.name}</h3>
              <p className="text-sm text-gray-400 bg-white/5 rounded-full py-1 px-2 mb-3">
                {product.category}
              </p>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {product.rating} • {product.reviewCount} in stock
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">
                {product.price} {product.currency}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
