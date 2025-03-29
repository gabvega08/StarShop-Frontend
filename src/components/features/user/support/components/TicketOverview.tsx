import React from 'react';
import {
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Search,
  Timer,
  Plus,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react"
import StatsCard from "@/components/ui/StarShopCard";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { TicketStats } from './types/ticket';

const TicketOverview: React.FC<{ stats: TicketStats }> = ({ stats }) => {
  return (
    <div className="w-full min-h-screenp-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white ml-3">Support Tickets</h1>
          <p className="text-gray-400 mt-1 ml-3">Manage and track your support requests</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Input
              placeholder="Search tickets..."
              className="pl-10 pr-4 bg-gray-900/60 border-gray-700 text-white w-full rounded-lg h-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10" size={18} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-lg hover:bg-[#83269439] border-gray-700 bg-gray-900/60">
              <SlidersHorizontal size={18} className="text-white" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-lg hover:bg-[#83269439] border-gray-700 bg-gray-900/60">
              <RotateCcw size={18} className="text-white " />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-lg">
              <Plus size={18} className="mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Ticket Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
          title="Total Tickets"
          value={stats.total}
          subtitle={`+${stats.weeklyIncrease} this week`}
          icon={MessageSquare}
          iconColor="text-purple-500"
          borderColor="bg-purple-500"
        />
        
        <StatsCard
          title="Open"
          value={stats.open.count}
          subtitle={`${stats.open.urgent} urgent`}
          icon={AlertTriangle}
          iconColor="text-yellow-500"
          borderColor="bg-yellow-500"
        />
        
        <StatsCard
          title="In Progress"
          value={stats.inProgress.count}
          subtitle={`Avg ${stats.inProgress.avgDays} days`}
          icon={Clock}
          iconColor="text-blue-500"
          borderColor="bg-blue-500"
        />
        
        <StatsCard
          title="Resolved"
          value={stats.resolved.count}
          subtitle={`Last ${stats.resolved.lastWeek} days`}
          icon={CheckCircle2}
          iconColor="text-green-500"
          borderColor="bg-green-500"
        />
      </div>

      {/* Response Time */}
      <div className="bg-[#170d243b]rounded-xl p-6 border border-[#1a1c3d]">
        <div className="flex items-center mb-4">
          <Timer className="text-purple-500 mr-2" size={20} />
          <h3 className="text-lg font-medium text-white">Response Time</h3>
        </div>
        <p className="text-gray-400 mb-4">
          Average first response time:{" "}
          <span className="text-white font-medium">{stats.responseTime.average} hours</span>
        </p>

        <div className="w-full h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${(stats.responseTime.average / stats.responseTime.sla) * 100}%`,
              background: "linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)",
            }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Target: {stats.responseTime.target} hours</span>
          <span>SLA: {stats.responseTime.sla} hours</span>
        </div>
      </div>
    </div>
  )
}

export default TicketOverview