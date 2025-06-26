import { LineChart } from 'lucide-react';

export function SalesChart() {
  return (
    <div className="lg:col-span-2 p-6 rounded-lg border border-white/10 bg-[#0F0E1D] shadow-[0_0_8px_rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Sales Performance</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-md bg-purple-600/20 text-purple-400 border border-purple-600/30">
            Week
          </button>
          <button className="px-3 py-1 text-sm rounded-md bg-transparent text-gray-400 hover:bg-purple-600/10">
            Month
          </button>
          <button className="px-3 py-1 text-sm rounded-md bg-transparent text-gray-400 hover:bg-purple-600/10">
            Year
          </button>
        </div>
      </div>
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-gray-500">
          <LineChart className="w-12 h-12 mx-auto mb-2" />
          <p>Analytics chart visualization placeholder</p>
        </div>
      </div>
    </div>
  );
}
