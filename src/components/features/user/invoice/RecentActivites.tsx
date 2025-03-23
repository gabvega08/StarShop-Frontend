"use client";

import { useState } from "react";
import Link from "next/link";
import { formatTimeAgo } from "@/utils/timeUtils";
import { ActivityEvent } from "@/types/activity";
import { ChevronRight, Mail } from "lucide-react";

interface RecentActivityProps {
  events: ActivityEvent[];
  maxDisplay?: number;
}

export default function RecentActivity({
  events,
  maxDisplay = 2,
}: RecentActivityProps) {
  const [displayCount, setDisplayCount] = useState(maxDisplay);
  const displayedEvents = events.slice(0, displayCount);

  const getEventIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "INVOICE_PAID":
        return (
          <div className="h-8 w-8 rounded-full bg-emerald-950 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 4L6.00008 11.3333L2.66675 8"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "INVOICE_CREATED":
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-950 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 7.33333V4.66667C13.3334 3.93029 12.7365 3.33333 12.0001 3.33333H4.00008C3.2637 3.33333 2.66675 3.93029 2.66675 4.66667V11.3333C2.66675 12.0697 3.2637 12.6667 4.00008 12.6667H12.0001C12.7365 12.6667 13.3334 12.0697 13.3334 11.3333V8.66667"
                stroke="#818CF8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33325 6.66667H10.6666"
                stroke="#818CF8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33325 9.33333H8.66659"
                stroke="#818CF8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "PAYMENT_REMINDER_SENT":
        return (
          <div className="h-8 w-8 rounded-full bg-amber-950 flex items-center justify-center">
            <Mail className="h-4 w-4 text-amber-400" />
          </div>
        );
    }
  };

  const getEventTitle = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "INVOICE_PAID":
        return "Invoice Paid";
      case "INVOICE_CREATED":
        return "Invoice Created";
      case "PAYMENT_REMINDER_SENT":
        return "Payment Reminder Sent";
    }
  };

  const getEventDescription = (event: ActivityEvent) => {
    switch (event.type) {
      case "INVOICE_PAID":
        return `${event.invoiceNumber} was paid by ${event.clientName}`;
      case "INVOICE_CREATED":
        return `New invoice ${event.invoiceNumber} was created for ${event.clientName}`;
      case "PAYMENT_REMINDER_SENT":
        return `Reminder sent to ${event.clientName} for ${event.invoiceNumber}`;
    }
  };

  return (
    <div className="w-full rounded-lg p-6 bg-[#dfaaca11] border border-gray-800 shadow-lg">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <p className="text-gray-400 text-sm">Latest invoice actions</p>
      </div>

      <div className="space-y-6 mt-6">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium">
                  {getEventTitle(event.type)}
                </h3>
                <p className="text-gray-400">{getEventDescription(event)}</p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-400">
                {formatTimeAgo(event.timestamp)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">
            No recent activity
          </p>
        )}
      </div>

      {events.length > maxDisplay && (
        <div className="mt-8 text-center">
          <Link
            href="/activity"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
          >
            View All Activity
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
