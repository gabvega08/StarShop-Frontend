"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChevronRight, Filter } from "lucide-react"

const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 2800 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2800 },
    { month: "May", revenue: 2000 },
    { month: "Jun", revenue: 2000 },
    { month: "Jul", revenue: 3000 },
    { month: "Aug", revenue: 3500 },
    { month: "Sep", revenue: 4000 },
    { month: "Oct", revenue: 3000 },
    { month: "Nov", revenue: 2800 },
    { month: "Dec", revenue: 2000 },
  ]
const RevenueOverview = () => {
    return (
      <div className="rounded-lg p-6 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-gray-900/50">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-white text-lg font-medium">Revenue Overview</h3>
            <p className="text-gray-400 text-sm">Monthly revenue for the past year</p>
          </div>
          <button className="text-gray-400 hover:text-gray-300">
            <Filter size={18} />
          </button>
        </div>
  
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" horizontal={true} vertical={true} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                domain={[0, 4000]}
                ticks={[0, 1000, 2000, 3000, 4000]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={0}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
  
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-gray-400 text-sm">Current Period</span>
          </div>
          <button className="flex items-center text-gray-400 hover:text-white text-sm font-medium">
            View Details
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }
  export default RevenueOverview;