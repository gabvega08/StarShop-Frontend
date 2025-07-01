'use client';

import { Search, Filter, Eye, Download, ChevronDown } from 'lucide-react';
import type { Invoice } from '../types';

interface InvoicesTableProps {
  invoices: Invoice[];
  selectedInvoice: Invoice;
  onSelectInvoice: (invoice: Invoice) => void;
}

export function InvoicesTable({
  invoices,
  selectedInvoice,
  onSelectInvoice,
}: InvoicesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-300';
      case 'pending':
        return 'text-yellow-300';
      case 'overdue':
        return 'text-red-300';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-600/10 border border-green-300/30';
      case 'pending':
        return 'bg-yellow-600/10 border border-yellow-300/30';
      case 'overdue':
        return 'bg-red-600/10 border border-red-300/30';
      default:
        return 'bg-white/5 border border-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return '✓';
      case 'pending':
        return '⏳';
      case 'overdue':
        return '⚠';
      default:
        return '○';
    }
  };

  return (
    <div className="w-full">
      {/* Top Row: Search + All Invoices + Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-3">
        {/* Left Group: Search */}
        <div className="flex items-center w-full relative">
          <input
            type="text"
            placeholder="Search invoices..."
            className="bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm 
                       rounded-md px-3 pl-9 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-transparent w-full"
          />
          <div className="text-gray-500 absolute top-3 left-3">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <select
            className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 min-w-[150px] py-2 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       w-full sm:w-auto"
          >
            <option>All Invoices</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>

          <button
            className="border border-white/10 text-white rounded-md px-4 py-1 
                     hover:bg-white/10 transition-colors w-full min-w-[100px] justify-between flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Second Row: "Recent Invoices" */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pb-4 gap-2">
        <h2 className="text-white text-xl font-medium">Recent Invoices</h2>
      </div>

      {/* Invoices List */}
      <div className="flex flex-col">
        {invoices.map(invoice => (
          <div
            key={invoice.id}
            onClick={() => onSelectInvoice(invoice)}
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-white/10 hover:bg-white/5 ${
              selectedInvoice.id === invoice.id ? 'bg-white/5' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(invoice.status).replace('text-', 'bg-')}`}
              >
                <span className="sr-only">{getStatusIcon(invoice.status)}</span>
              </div>
              <div>
                <p className="text-white font-medium">{invoice.company}</p>
                <p className="text-gray-400 text-sm">
                  {invoice.description} • {invoice.invoiceNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{invoice.amount}</p>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusBg(invoice.status)}`}
                >
                  <span className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 p-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
          Load More Invoices
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
