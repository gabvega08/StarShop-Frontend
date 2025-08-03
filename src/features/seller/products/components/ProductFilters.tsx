'use client';

import { useState } from 'react';
import { ChevronDown, Search, Grid, List, X, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import type { ProductFilter } from '../types';

const PRODUCT_FILTERS = [
  { key: 'all' as const, label: 'All Products' },
  { key: 'clothing' as const, label: 'Clothing' },
  { key: 'electronics' as const, label: 'Electronics' },
  { key: 'accessories' as const, label: 'Accessories' },
];

const PRODUCT_CATEGORIES = [
  'Clothing',
  'Electronics',
  'Accessories',
  'Home & Garden',
];
const PRICE_RANGES = ['< 25 XLM', '25-50 XLM', '> 50 XLM', '> 100 XLM'];
const SORT_OPTIONS = [
  'Newest',
  'Price: Low to High',
  'Price: High to Low',
  'Most Popular',
];

interface FilterPill {
  id: string;
  label: string;
  value: string;
}

interface ProductFiltersProps {
  activeFilter?: ProductFilter;
  onFilterChange?: (filter: ProductFilter) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function ProductFilters({
  activeFilter = 'all',
  onFilterChange = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  viewMode = 'grid',
  onViewModeChange = () => {},
}: ProductFiltersProps) {
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [activeFilters, setActiveFilters] = useState<FilterPill[]>([]);

  const availableFilters = [
    { id: 'category', label: 'Category', options: PRODUCT_CATEGORIES },
    { id: 'price', label: 'Price', options: PRICE_RANGES },
  ];

  const removeFilter = (filterId: string) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const addFilter = (filterId: string, label: string, value: string) => {
    const newFilter: FilterPill = { id: filterId, label, value };
    setActiveFilters(prev => {
      const filtered = prev.filter(f => f.id !== filterId);
      return [...filtered, newFilter];
    });
  };

  return (
    <div className="space-y-6">
      {/* Top: Tabs + Search */}
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-[#13111E] rounded-md gap-4">
          {PRODUCT_FILTERS.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>
      </div>

      {/* Filter Pills + Add Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {activeFilters.map(filter => (
            <div
              key={filter.id}
              className="flex items-center gap-2 p-2 bg-slate-800/80 backdrop-blur-sm text-white rounded-full border border-slate-600/50 hover:bg-slate-700/80 transition-colors"
            >
              <span className="text-sm font-medium">
                {filter.label}: {filter.value}
              </span>
              <button
                onClick={() => removeFilter(filter.id)}
                className="hover:bg-slate-600/50 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 bg-transparent backdrop-blur-sm text-slate-300 rounded-lg hover:bg-slate-700/50 border border-slate-600/50"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800/95 backdrop-blur-sm border-slate-600/50">
              {availableFilters.map(filterType => (
                <div key={filterType.id} className="p-2">
                  <div className="text-sm font-medium text-slate-300 mb-2">
                    {filterType.label}
                  </div>
                  {filterType.options.map(option => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      className="text-slate-200 hover:bg-slate-700/50"
                      onCheckedChange={checked => {
                        if (checked)
                          addFilter(filterType.id, filterType.label, option);
                      }}
                      checked={activeFilters.some(
                        f => f.id === filterType.id && f.value === option
                      )}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bottom: Sort + View Mode */}
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex border border-gray-700 rounded-md p-2 bg-gray-800 items-center gap-2">
              <button className="flex items-center gap-6 text-sm text-white">
                {selectedSort}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700">
            {SORT_OPTIONS.map(option => (
              <DropdownMenuCheckboxItem
                key={option}
                className="text-gray-200 hover:bg-gray-700"
                checked={selectedSort === option}
                onCheckedChange={checked => {
                  if (checked) setSelectedSort(option);
                }}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-md p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
