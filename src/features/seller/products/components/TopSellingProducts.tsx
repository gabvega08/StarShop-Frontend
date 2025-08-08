import { ChevronRight } from 'lucide-react';
import { MOCK_TOP_SELLING } from '../constants';

export function TopSellingProducts() {
  return (
    <div className="bg-[#13111E]/5 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center pt-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Top Selling Products
          </h3>
          <p className="text-sm text-gray-400">Best performers this month</p>
        </div>
      </div>
      <div className="space-y-4">
        {MOCK_TOP_SELLING.map(product => (
          <div
            key={product.name}
            className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">
                {product.name}
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-gray-400">{product.sold}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{product.revenue}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div
                className={`text-sm font-medium ${product.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
              >
                {product.growth}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-11">
        <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
          View All Products
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
