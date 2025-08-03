import { Box } from 'lucide-react';
import { MOCK_INVENTORY_STATUS } from '../constants';

export function InventoryStatus() {
  const { total, active, lowStock, outOfStock, inStock } =
    MOCK_INVENTORY_STATUS;

  return (
    <div className=" bg-[#13111E]/5 rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-20 left-20 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-16 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-8 left-16 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 right-32 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">
            Inventory Status
          </h3>
          <p className="text-gray-400">Current stock levels</p>
        </div>
        <button className="text-gray-400 hover:text-purple-400 transition-colors">
          <Box className="w-8 h-8 text-purple-500" />
        </button>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-8 relative z-10">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="rgb(31, 41, 55)"
              strokeWidth="12"
            />
            {/* Progress segments - Plus sign pattern */}
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="12"
              strokeDasharray="60 348"
              strokeDashoffset="30"
              strokeLinecap="round"
              className="opacity-90"
            />
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="12"
              strokeDasharray="60 348"
              strokeDashoffset="-75"
              strokeLinecap="round"
              className="opacity-90"
            />
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="12"
              strokeDasharray="60 348"
              strokeDashoffset="-175"
              strokeLinecap="round"
              className="opacity-90"
            />
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="12"
              strokeDasharray="60 348"
              strokeDashoffset="-270"
              strokeLinecap="round"
              className="opacity-90"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">{total}</div>
              <div className="text-gray-400 text-sm">Total</div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 relative z-10">
        <div className="bg-[#22C55E1A] rounded-xl p-4 border border-green-700/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4ADE80] mb-1">
              {active}
            </div>
            <div className="text-2xl font-bold text-[#4ADE80] mb-2">
              {inStock}
            </div>
            <div className="text-sm text-[#FFFFFF99]">In Stock</div>
          </div>
        </div>

        <div className="bg-[#F59E0B1A] rounded-xl p-4 border border-yellow-700/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#FBBF24] mb-4">
              {lowStock}
            </div>
            <div className="text-sm text-[#FFFFFF99]">Low Stock</div>
          </div>
        </div>

        <div className="bg-[#EF44441A] rounded-xl p-4 border border-red-700/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F87171] mb-4">
              {outOfStock}
            </div>
            <div className="text-sm text-[#FFFFFF99]">Out of Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
}
