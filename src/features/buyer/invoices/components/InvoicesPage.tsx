'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { InvoicesHeader } from './InvoicesHeader';
import { StatsCards } from './StatsCards';
import { InvoicesTable } from './InvoicesTable';
import { InvoiceDetails } from './InvoiceDetails';
import { MOCK_INVOICES } from '../constants/mockData';
import type { Invoice } from '../types';

export function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(
    MOCK_INVOICES[0]
  );
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleDownloadPDF = (id: string) => {
    console.log('Download PDF', id);
  };

  const handleMarkAsPaid = (id: string) => {
    console.log('Mark as paid', id);
  };

  const handleViewOrder = (id: string) => {
    console.log('View order', id);
  };

  const handleContactSeller = (id: string) => {
    console.log('Contact seller', id);
  };

  return (
    <div className="p-6 space-y-6">
      <InvoicesHeader />
      <StatsCards />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
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
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          <button
            className="border border-white/10 text-white rounded-md px-4 py-1 
                       hover:bg-white/10 transition-colors w-full min-w-[100px] justify-between flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="border border-white/10 bg-white/5 rounded-xl shadow-lg p-6">
        <InvoicesTable
          invoices={MOCK_INVOICES}
          selectedInvoice={selectedInvoice}
          onSelectInvoice={setSelectedInvoice}
        />
      </div>

      <div className="border border-white/10 bg-white/5 rounded-xl shadow-lg p-6">
        <InvoiceDetails
          invoice={selectedInvoice}
          onDownloadPDF={handleDownloadPDF}
          onMarkAsPaid={handleMarkAsPaid}
          onViewOrder={handleViewOrder}
          onContactSeller={handleContactSeller}
        />
      </div>
    </div>
  );
}
