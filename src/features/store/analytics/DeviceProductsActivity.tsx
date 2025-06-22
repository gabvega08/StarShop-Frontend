"use client"

import React from 'react';
import { ChevronRight, ShoppingCart, Box, Star, Eye, Smartphone, Monitor, Tablet } from 'lucide-react';

const DeviceProductsActivity = () => {
  const deviceData = [
    { type: 'Mobile', percentage: 65, color: 'bg-purple-500', icon: <Smartphone className="text-purple-500" size={16} /> },
    { type: 'Desktop', percentage: 25, color: 'bg-blue-500', icon: <Monitor className="text-blue-500" size={16} /> },
    { type: 'Tablet', percentage: 10, color: 'bg-green-500', icon: <Tablet className="text-green-500" size={16} /> }
  ];

  const topProducts = [
    { name: 'Premium Hoodie', sold: 24, revenue: '2040 XLM', icon: <Box className="text-purple-500" /> },
    { name: 'Urban Sneakers', sold: 18, revenue: '2160 XLM', icon: <Box className="text-purple-500" /> },
    { name: 'Graphic T-Shirt', sold: 12, revenue: '420 XLM', icon: <Box className="text-purple-500" /> }
  ];

  const recentActivity = [
    { 
      type: 'New Order', 
      details: 'Order #8832 - Premium Hoodie', 
      time: '2 hours ago',
      icon: <ShoppingCart className="text-green-500" />
    },
    { 
      type: 'New Review', 
      details: '5★ review for Urban Sneakers', 
      time: '5 hours ago',
      icon: <Star className="text-yellow-500" />
    },
    { 
      type: 'Product View', 
      details: 'Leather Wallet viewed 24 times', 
      time: '1 day ago',
      icon: <Eye className="text-blue-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
      <div className="mt-6 p-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-gray-900/50">
        <h3 className="text-white text-lg font-medium">Device Breakdown</h3>
        <p className="text-white/60 text-sm">Visitors by device type</p>
        
        <div className="flex justify-center my-6">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#8b5cf6" 
                strokeWidth="2"
                strokeDasharray={`${deviceData[0].percentage * 2.51 - 2} 251`}
                strokeDashoffset="0"
              />
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#3b82f6" 
                strokeWidth="2"
                strokeDasharray={`${deviceData[1].percentage * 2.51 - 2} 251`}
                strokeDashoffset={`${-(deviceData[0].percentage * 2.51)}`}
              />
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#10b981" 
                strokeWidth="2"
                strokeDasharray={`${deviceData[2].percentage * 2.51 - 2} 251`}
                strokeDashoffset={`${-(deviceData[0].percentage + deviceData[1].percentage) * 2.51}`}
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          {deviceData.map((device, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {device.icon}
                <span className="text-white">{device.type}</span>
              </div>
              <span className="text-white">{device.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-gray-900/50">
        <h3 className="text-white text-lg font-medium">Top Products</h3>
        <p className="text-white/60 text-sm">Best selling items</p>
        
        <div className="mt-4 space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-md">
                  {product.icon}
                </div>
                <div>
                  <p className="text-white">{product.name}</p>
                  <p className="text-white/60 text-sm">{product.sold} sold</p>
                </div>
              </div>
              <span className="text-white">{product.revenue}</span>
            </div>
          ))}
        </div>
        
        <button className="mt-6 flex items-center text-white/60 text-sm hover:text-white justify-center w-full">
          View All Products <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-6 p-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-gray-900/50">
        <h3 className="text-white text-lg font-medium">Recent Activity</h3>
        <p className="text-white/60 text-sm">Latest store events</p>
        
        <div className="mt-4 space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-md mt-1">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-white">{activity.type}</p>
                  <p className="text-white/60 text-sm">{activity.details}</p>
                </div>
              </div>
              <span className="text-white/60 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
        
        <button className="mt-6 flex items-center text-white/60 text-sm hover:text-white justify-center w-full">
          View All Activity <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DeviceProductsActivity;
