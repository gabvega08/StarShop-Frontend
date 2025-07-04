'use client';

import { Input } from '@/shared/components/ui/Input';
import { NFTFilter } from '../types/nft';
import { Search, Grid3X3, List, Filter } from 'lucide-react';

interface NFTFiltersProps {
  filters: NFTFilter[];
  onFilterChange: (filterId: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function NFTFilters({
  filters,
  onFilterChange,
  searchValue,
  onSearchChange,
}: NFTFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      {/* Search bar */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
          <Input
            placeholder="Search NFTs..."
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            className="pl-10 bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition"
          />
        </div>
      </div>
      {/* Filter buttons */}
      <div className="flex gap-2 items-center">
        {filters.map(filter => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg border
              ${
                filter.active
                  ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
                  : 'bg-transparent border-white/20 text-white/70 hover:bg-white/10'
              }
              transition
            `}
            aria-label={filter.label}
          >
            {filter.id === 'grid' ? (
              <Grid3X3 className="w-5 h-5" />
            ) : (
              <List className="w-5 h-5" />
            )}
          </button>
        ))}
        {/* Filter button */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 h-10 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter</span>
        </button>
      </div>
    </div>
  );
}
