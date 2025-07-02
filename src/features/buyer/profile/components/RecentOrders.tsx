export function RecentOrders() {
  return (
    <div className="bg-custom-card-background rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Orders</h2>
      <div className="space-y-4">
        <div className="rounded-lg p-4 bg-gradient-to-r from-[#232B4D] to-[#1B1F2B] flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Premium Hoodie</div>
            <div className="text-gray-400 text-sm">March 05, 2024</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-blue-400 text-sm font-semibold mb-1">
              In Transit
            </span>
            <button className="text-xs text-white/60 hover:text-white">
              Track Order
            </button>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-gradient-to-r from-[#1B2D2B] to-[#1B2B1F] flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Urban Sneakers</div>
            <div className="text-gray-400 text-sm">March 08, 2024</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-green-400 text-sm font-semibold mb-1">
              Delivered
            </span>
            <button className="text-xs text-white/60 hover:text-white">
              Track Order
            </button>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-gradient-to-r from-[#2B231B] to-[#2B1B1B] flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Graphic T-Shirt</div>
            <div className="text-gray-400 text-sm">March 12, 2024</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-yellow-400 text-sm font-semibold mb-1">
              Processing
            </span>
            <button className="text-xs text-white/60 hover:text-white">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
