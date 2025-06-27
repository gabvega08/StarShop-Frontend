import React, { useState } from 'react';
import { Invoice } from '../types/invoice';
import { UpcomingAndOverdueInvoices } from './upcoming-invoices';
import { InvoiceDetails } from './invoice-details';
import RecentInvoicesTable from './recent-invoices-table';
import InvoicesTable from './invoices-table';

interface InvoiceListProps {
  invoices: Invoice[];
  upcomingInvoices?: Invoice[];
  overdueInvoices?: Invoice[];
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  upcomingInvoices = [],
  overdueInvoices = [],
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleMarkAsPaid = (id: string) => {
    // TODO: Implement mark as paid functionality
    console.log('Mark as paid:', id);
  };

  const handleDownloadPDF = (id: string) => {
    // TODO: Implement PDF download functionality
    console.log('Download PDF:', id);
  };

  const handleViewOrder = (id: string) => {
    console.log('View order:', id);
  };

  const handleContactSeller = (id: string) => {
    // TODO: Implement contact seller functionality
    console.log('Contact seller:', id);
  };

  const handleInvoiceClick = (invoice: Invoice) => {
    if (selectedInvoice?.id === invoice.id) {
      setSelectedInvoice(null);
    } else {
      setSelectedInvoice(invoice);
    }
  };

  return (
    <div className="space-y-8">
      <RecentInvoicesTable
        invoices={invoices}
        onInvoiceClick={handleInvoiceClick}
      />
      <InvoicesTable />

      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onMarkAsPaid={handleMarkAsPaid}
          onDownloadPDF={handleDownloadPDF}
          onViewOrder={handleViewOrder}
          onContactSeller={handleContactSeller}
        />
      )}

      <UpcomingAndOverdueInvoices
        upcomingInvoices={upcomingInvoices}
        overdueInvoices={overdueInvoices}
        onViewDetails={handleViewOrder}
      />
    </div>
  );
};
