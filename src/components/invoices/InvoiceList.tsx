import React, { useState } from 'react';
import { Invoice } from '@/lib/types/invoice';
import { formatDate } from '@/lib/utils/date';
import { InvoiceDetails } from './InvoiceDetails';

interface InvoiceListProps {
  invoices: Invoice[];
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
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
    // TODO: Implement view order functionality
    console.log('View order:', id);
  };

  const handleContactSeller = (id: string) => {
    // TODO: Implement contact seller functionality
    console.log('Contact seller:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
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
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Invoices</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-300">Invoice Number</th>
                <th className="text-left p-4 text-gray-300 hidden sm:table-cell">Date</th>
                <th className="text-left p-4 text-gray-300 hidden md:table-cell">Due Date</th>
                <th className="text-right p-4 text-gray-300">Amount</th>
                <th className="text-right p-4 text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  onClick={() => handleInvoiceClick(invoice)}
                  className={`border-t border-gray-800 hover:bg-gray-800 cursor-pointer ${
                    selectedInvoice?.id === invoice.id ? 'bg-gray-800' : ''
                  }`}
                >
                  <td className="p-4 text-white">{invoice.invoiceNumber}</td>
                  <td className="p-4 text-gray-400 hidden sm:table-cell">
                    {formatDate(invoice.invoiceDate)}
                  </td>
                  <td className="p-4 text-gray-400 hidden md:table-cell">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="p-4 text-right text-white">
                    {invoice.total} {invoice.currency}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`${getStatusColor(
                        invoice.status
                      )} capitalize inline-block px-2 py-1 rounded-full text-sm`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onMarkAsPaid={handleMarkAsPaid}
          onDownloadPDF={handleDownloadPDF}
          onViewOrder={handleViewOrder}
          onContactSeller={handleContactSeller}
        />
      )}
    </div>
  );
}; 