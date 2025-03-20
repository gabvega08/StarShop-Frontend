import React from "react";
import {
  Package,
  ShoppingBag,
  Star,
} from "lucide-react";

const StoreOverview = () => {
  return (
    <main className="flex-grow p-8 space-y-8 bg-stars">
      <section>
        <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          Store Overview
        </h2>
        <div className="bg-[#13111E] border border-white/10 rounded-lg p-6 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <div className="mb-6">
            <div className="text-sm text-white/60">Total Revenue</div>
            <div className="text-3xl font-semibold text-white mt-1">
              $26,540.25
            </div>
          </div>
          <div className="divide-y divide-white/10">
            <div className="flex items-center justify-between p-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="font-medium text-white">Active Products</div>
                  <div className="text-sm text-white/60">Currently listed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">45 items</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-white">Pending Orders</div>
                  <div className="text-sm text-white/60">Need shipping</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">12 orders</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium text-white">Store Rating</div>
                  <div className="text-sm text-white/60">Customer reviews</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">4.8/5.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StoreOverview;
