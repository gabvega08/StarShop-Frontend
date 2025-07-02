'use client';

import { Eye, Download, ChevronDown } from 'lucide-react';
import type { Invoice } from '../types';
import {
  getStatusBg,
  getStatusColor,
  getStatusDotColor,
  getStatusIcon,
} from '../utils';
import { useState } from 'react';

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
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleInvoices = invoices.slice(0, visibleCount);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pb-4 gap-2">
        <h2 className="text-white text-xl font-medium">Recent Invoices</h2>
      </div>

      <div className="flex flex-col">
        {visibleInvoices.map(invoice => (
          <div
            key={invoice.id}
            onClick={() => onSelectInvoice(invoice)}
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-white/10 hover:bg-white/5 ${
              selectedInvoice.id === invoice.id ? 'bg-white/5' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${getStatusDotColor(invoice.status)}`}
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
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setVisibleCount(c => c + 5)}
          disabled={visibleCount >= invoices.length}
        >
          Load More Invoices
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
