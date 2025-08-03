'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ProductPaginationProps {
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export function ProductPagination({
  currentPage = 1,
  totalPages = 23,
  itemsPerPage = 7,
  totalItems = 156,
  onPageChange,
}: ProductPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between py-5 border-[#FFFFFF1A] border-t-2 mt-8">
      <div className="text-sm text-[#FFFFFF99]">
        Showing {startItem}-{endItem} of {totalItems} products
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="text-[#FFFFFF99] hover:text-white hover:bg-[#FFFFFF1A] disabled:opacity-50 disabled:cursor-not-allowed border border-[#FFFFFF1A] px-4 py-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-white hover:text-white hover:bg-[#FFFFFF1A] border border-[#FFFFFF33] bg-[#FFFFFF0A] px-4 py-2"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
