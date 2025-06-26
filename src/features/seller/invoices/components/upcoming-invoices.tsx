import React from 'react';
import { CalendarIcon, SendIcon } from 'lucide-react';
import {
  fakeOverdueInvoices,
  fakeUpcomingInvoices,
} from '../constants/upcoming-invoices';

export const UpcomingAndOverdueInvoices: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upcoming Section */}
      <div
        className="rounded-lg shadow-lg outline outline-1 outline-gray-700 p-6"
        style={{ borderColor: '#FFFFFF4D', borderWidth: '1px' }}
      >
        <h3 className="text-lg font-medium text-white mb-2">
          Upcoming Due Dates
        </h3>
        <p className="text-sm text-gray-400 mb-4">Invoices due soon</p>
        <div className="space-y-4">
          {fakeUpcomingInvoices.map(invoice => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-[8px] transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid transparent';
              }}
            >
              <div>
                <p className="font-medium text-white">{invoice.store}</p>
                <p className="text-sm text-gray-400">
                  {invoice.id} • Due: {invoice.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {invoice.amount} {invoice.currency}
                </p>
                <p className="text-sm text-yellow-400">
                  {invoice.daysLeft} days left
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] bg-white/10 mt-4"></div>
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-700 py-2.5 text-white transition-all duration-200 cursor-pointer"
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.border = '1px solid transparent';
          }}
        >
          <CalendarIcon className="w-5 h-5" />
          View Calendar
        </button>
      </div>

      {/* Overdue Section */}
      <div
        className="rounded-lg shadow-lg outline outline-1 outline-gray-700 p-6"
        style={{ borderColor: '#FFFFFF4D', borderWidth: '1px' }}
      >
        <h3 className="text-lg font-medium text-white mb-2">
          Overdue Invoices
        </h3>
        <p className="text-sm text-gray-400 mb-4">Invoices past due date</p>
        <div className="space-y-4">
          {fakeOverdueInvoices.map(invoice => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-[8px] transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
              }}
            >
              <div>
                <p className="font-medium text-white">{invoice.store}</p>
                <p className="text-sm text-gray-400">
                  {invoice.id} • Due: {invoice.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {invoice.amount} {invoice.currency}
                </p>
                <p className="text-sm text-red-500">
                  {invoice.daysOverdue} days overdue
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] bg-white/10 mt-4"></div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 py-2.5 text-white transition-colors">
          <SendIcon className="w-5 h-5" />
          Send Payment Reminders
        </button>
      </div>
    </div>
  );
};
