import { AlertTriangle, Package } from 'lucide-react';
import { MOCK_INVENTORY_ALERTS } from '../constants';

export function InventoryAlerts() {
  const lowStockAlert = MOCK_INVENTORY_ALERTS.find(
    alert => alert.type === 'low-stock'
  );
  const outOfStockAlert = MOCK_INVENTORY_ALERTS.find(
    alert => alert.type === 'out-of-stock'
  );

  return (
    <div className="bg-[#13111E]/5 rounded-lg py-6 border border-gray-800">
      <div className="mb-6 p-6">
        <h3 className="text-lg font-semibold text-white">Inventory Alerts</h3>
        <p className="text-sm text-gray-400">Products that need attention</p>
      </div>
      <div className="space-y-6">
        {/* Low Stock Items */}
        {lowStockAlert && lowStockAlert.items.length > 0 && (
          <div className="bg-[#F59E0B1A] p-4 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-yellow-500" />
              </div>
              <span className="text-sm font-medium text-yellow-400">
                Low Stock Items
              </span>
            </div>
            <div className="space-y-2">
              {lowStockAlert.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-yellow-400">
                    {item.count} {item.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs text-[#FBBF24] transition-colors bg-[#0E0E1B] py-2 rounded-sm border border-yellow-500/20">
              Restock Items
            </button>
          </div>
        )}

        {/* Out of Stock Items */}
        {outOfStockAlert && outOfStockAlert.items.length > 0 && (
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <Package className="w-3 h-3 text-red-500" />
              </div>
              <span className="text-sm font-medium text-red-400">
                Out of Stock Items
              </span>
            </div>
            <div className="space-y-2">
              {outOfStockAlert.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-red-400">{item.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs text-[#F87171] transition-colors bg-[#0E0E1B] py-2 rounded-sm border border-red-500/20">
              Restock Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
