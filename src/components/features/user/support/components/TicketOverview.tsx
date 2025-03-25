import React from 'react';
import { MessageSquare, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import Card from "@/components/ui/StarShopCard";
import { TicketStats } from './types/ticket';

const TicketOverview: React.FC<{ stats: TicketStats }> = ({ stats }) => {
  return (
    <div className="w-full mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Tickets */}
        <Card className="p-6 bg-background">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-normal text-muted-foreground">Total Tickets</h3>
            <MessageSquare className="text-purple-500 ml-auto" />
          </div>
          <p className="text-3xl font-bold mt-2 text-white">{stats.total}</p>
          <p className="text-sm text-success text-muted-foreground">
            +{stats.weeklyIncrease} this week
          </p>
        </Card>

        {/* Open Tickets */}
        <Card className="p-6 bg-background border-b-4 border-warning">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold text-muted-foreground">Open</h3>
            <AlertTriangle className="text-yellow-500 ml-auto" />
          </div>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{stats.open.count}</p>
          <p className="text-sm text-warning text-muted-foreground">
            {stats.open.urgent} urgent
          </p>
        </Card>

        {/* In Progress */}
        <Card className="p-6 bg-background border-b-4 border-info">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold text-muted-foreground">In Progress</h3>
            <Clock className="text-blue-500 ml-auto" />
          </div>
          <p className="text-3xl font-bold mt-2 text-blue-500">{stats.inProgress.count}</p>
          <p className="text-sm text-muted-foreground">
            Average {stats.inProgress.avgDays} days
          </p>
        </Card>

        {/* Resolved */}
        <Card className="p-6 bg-background border-b-4 border-success">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold text-muted-foreground">Resolved</h3>
            <CheckCircle2 className="text-green-500 ml-auto" />
          </div>
          <p className="text-3xl font-bold mt-2 text-green-500">{stats.resolved.count}</p>
          <p className="text-sm text-muted-foreground">
            Last 7 days
          </p>
        </Card>
      </div>

      {/* Response Time */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Response Time
        </h3>
        <p className="text-sm text-muted-foreground">
          Average first response time: {stats.responseTime.average} hours
        </p>
        <div className="mt-4 w-full h-2 bg-muted rounded-full relative">
          <div 
            className="absolute h-full rounded-full"
            style={{
              width: `${(stats.responseTime.average / stats.responseTime.sla) * 100}%`,
              background: 'linear-gradient(90deg, #22c55e 0%, #eab308 50%, #f97316 100%)'
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            Target: {stats.responseTime.target} hours
          </p>
          <p className="text-sm text-muted-foreground">
            SLA: {stats.responseTime.sla} hours
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TicketOverview;