'use client';

import { useState } from 'react';
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
      <InvoicesTable
        invoices={MOCK_INVOICES}
        selectedInvoice={selectedInvoice}
        onSelectInvoice={setSelectedInvoice}
      />
      <InvoiceDetails
        invoice={selectedInvoice}
        onDownloadPDF={handleDownloadPDF}
        onMarkAsPaid={handleMarkAsPaid}
        onViewOrder={handleViewOrder}
        onContactSeller={handleContactSeller}
      />
    </div>
  );
}
