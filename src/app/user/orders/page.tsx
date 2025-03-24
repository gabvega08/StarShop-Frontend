"use client";


import OrderTable from "@/components/OrderTable";


export default function RecentOrders() {
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent p-6 sm:p-4 md:p-6">
      <div className="w-[1184px] rounded-lg border border-white/10 bg-transparent shadow-lg">
        
        {/* Header */}
        

        {/* Orders Table */}
        <OrderTable />

      </div>
    </div>
  );
}


