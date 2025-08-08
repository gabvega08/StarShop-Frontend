import { Plus, Upload } from 'lucide-react';

export function ProductsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Products</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your store inventory and listings
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
          <Upload className="w-4 h-4" />
          Import
        </button>
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </div>
  );
}
