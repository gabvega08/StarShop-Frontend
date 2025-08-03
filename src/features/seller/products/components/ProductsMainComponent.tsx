'use client';

import { useState, useMemo } from 'react';
import { ProductsHeader } from './ProductsHeader';
import { ProductPerformance } from './ProductPerformance';
import { InventoryStatus } from './InventoryStatus';
import { QuickActions } from './QuickActions';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { ProductPagination } from './ProductPagination';
import { TopSellingProducts } from './TopSellingProducts';
import { InventoryAlerts } from './InventoryAlerts';
import { BulkActions } from './BulkActions';
import { MOCK_PRODUCTS } from '../constants';
import type { ProductFilter } from '../types';

export function ProductsMainComponent() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;

    // Apply filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => {
        // Handle status-based filtering
        if (activeFilter === 'out-of-stock') {
          return product.status === 'out-of-stock';
        }

        // Handle category-based filtering
        if (
          activeFilter === 'clothing' ||
          activeFilter === 'electronics' ||
          activeFilter === 'accessories'
        ) {
          return product.category.toLowerCase() === activeFilter.toLowerCase();
        }

        return true;
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-custom-card-background text-white">
      <div className="p-8">
        {/* Header */}
        <ProductsHeader />

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProductPerformance />
          <InventoryStatus />
          <QuickActions />
        </div>

        {/* Filters */}
        <ProductFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Products Grid */}
        <div className="mt-6 bg-[#13111E] p-6 rounded-md">
          <ProductGrid products={filteredProducts} viewMode={viewMode} />
          <ProductPagination />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <TopSellingProducts />
          <InventoryAlerts />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12">
          <BulkActions />
        </div>
      </div>
    </div>
  );
}
