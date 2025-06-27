import React from 'react';
import { CalendarIcon, SendIcon } from 'lucide-react';
import { Invoice } from '../types/invoice';

interface UpcomingAndOverdueInvoicesProps {
  upcomingInvoices: Invoice[];
  overdueInvoices: Invoice[];
  onViewDetails: (id: string) => void;
}

export const UpcomingAndOverdueInvoices: React.FC<
  UpcomingAndOverdueInvoicesProps
> = ({ upcomingInvoices, overdueInvoices, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upcoming Section */}
      <div className="rounded-lg shadow-lg border border-white/30 p-6">
        <h3 className="text-lg font-medium text-white mb-2">
          Upcoming Due Dates
        </h3>
        <p className="text-sm text-gray-400 mb-4">Invoices due soon</p>
        <div className="space-y-4">
          {upcomingInvoices.map(invoice => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg transition-all duration-200 cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/20 border border-transparent"
              onClick={() => onViewDetails(invoice.id)}
            >
              <div>
                <p className="font-medium text-white">{invoice.store}</p>
                <p className="text-sm text-gray-400">
                  {invoice.id} • Due: {invoice.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {invoice.details.items.reduce(
                    (total, item) => total + item.amount,
                    0
                  )}{' '}
                  {invoice.details.items[0]?.currency || 'USD'}
                </p>
                <p className="text-sm text-yellow-400">
                  {/* Calculate days left - this would need actual date calculation */}
                  Due soon
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-white/10 mt-4"></div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-700 py-2.5 text-white transition-all duration-200 cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/20">
          <CalendarIcon className="w-5 h-5" />
          View Calendar
        </button>
      </div>

      {/* Overdue Section */}
      <div className="rounded-lg shadow-lg border border-white/30 p-6">
        <h3 className="text-lg font-medium text-white mb-2">
          Overdue Invoices
        </h3>
        <p className="text-sm text-gray-400 mb-4">Invoices past due date</p>
        <div className="space-y-4">
          {overdueInvoices.map(invoice => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg transition-all duration-200 cursor-pointer hover:bg-red-500/20 hover:border-red-500/30"
              onClick={() => onViewDetails(invoice.id)}
            >
              <div>
                <p className="font-medium text-white">{invoice.store}</p>
                <p className="text-sm text-gray-400">
                  {invoice.id} • Due: {invoice.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {invoice.details.items.reduce(
                    (total, item) => total + item.amount,
                    0
                  )}{' '}
                  {invoice.details.items[0]?.currency || 'USD'}
                </p>
                <p className="text-sm text-red-500">Overdue</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-white/10 mt-4"></div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 py-2.5 text-white transition-colors">
          <SendIcon className="w-5 h-5" />
          Send Payment Reminders
        </button>
      </div>
    </div>
  );
};
