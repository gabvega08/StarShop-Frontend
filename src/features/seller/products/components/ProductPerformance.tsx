import { ChevronRight, ChartNoAxesColumn } from 'lucide-react';
import { MOCK_PRODUCT_PERFORMANCE } from '../constants';

export function ProductPerformance() {
  return (
    <div className="bg-[#13111E]/5 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-white">
            Product Performance
          </h3>
          <p className="text-sm text-gray-400">
            Top selling products this month
          </p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ChartNoAxesColumn className="w-8 h-8 text-purple-500" />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_PRODUCT_PERFORMANCE.map((product, index) => (
          <div key={product.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                {product.name}
              </span>
              <span className="text-sm text-gray-400">{product.sold} sold</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  index === 0
                    ? 'bg-purple-500'
                    : index === 1
                      ? 'bg-purple-500'
                      : 'bg-purple-500'
                }`}
                style={{ width: `${product.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-9 text-lg text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
        View Sales Report
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
