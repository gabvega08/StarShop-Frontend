import React from 'react';
import { Invoice } from '@/lib/types/invoice';
import { formatDate } from '@/lib/utils/date';
import { CheckCircleIcon, DownloadIcon, MessageCircleIcon, EyeIcon } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onMarkAsPaid: (id: string) => void;
  onDownloadPDF: (id: string) => void;
  onViewOrder: (id: string) => void;
  onContactSeller: (id: string) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  onMarkAsPaid,
  onDownloadPDF,
  onViewOrder,
  onContactSeller,
}) => {
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

  return (
    <div className="bg-[#0F0E1D] rounded-lg p-6 space-y-6 border border-white/30">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-white">Invoice Details</h2>
          <p className="text-gray-400">{invoice.invoiceNumber}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => onDownloadPDF(invoice.id)}
            className="flex items-center gap-3 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          {invoice.status !== 'paid' && (
            <button
              onClick={() => onMarkAsPaid(invoice.id)}
              className="flex items-center gap-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-white/60">Invoice Date</p>
          <p className="text-white">{formatDate(invoice.invoiceDate)}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-white/60">Due Date</p>
          <p className="text-white">{formatDate(invoice.dueDate)}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-white/60">Status</p>
          <p className={`${getStatusColor(invoice.status)} capitalize`}>
            {invoice.status}
          </p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg overflow-hidden">

      <div className="flex justify-between items-center p-4 mb-4">
        <p className="text-white/60">Items</p>
        <p className="text-white/60">Amount</p>
      </div>    

        <table className="w-full">
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-t border-white/10">
                <td className="p-4 text-white">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-right text-white">
                  {item.amount} {item.currency}
                </td>
              </tr>
            ))}
            <tr className="border-t border-white/10">
              <td className="p-4 text-white/60">Shipping</td>
              <td className="p-4 text-right text-white">
                {invoice.shipping.cost} {invoice.currency}
              </td>
            </tr>
          </tbody>
          <tfoot className="bg-white/5">
            <tr>
              <td className="p-4 text-white/60">Subtotal</td>
              <td className="p-4 text-right text-white">
                {invoice.subtotal} {invoice.currency}
              </td>
            </tr>
            <tr>
              <td className="p-4 text-white/60">Tax</td>
              <td className="p-4 text-right text-white">
                {invoice.tax} {invoice.currency}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white">Total</td>
              <td className="p-4 text-right font-semibold text-white">
                {invoice.total} {invoice.currency}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.paymentDetails.received && (
        <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircleIcon className="w-5 h-5" />
            <span>Payment Received</span>
          </div>
          <p className="text-gray-400 mt-2">
            Payment was received on {formatDate(invoice.paymentDetails.date || '')} via{' '}
            {invoice.paymentDetails.method}. Transaction ID:{' '}
            {invoice.paymentDetails.transactionId}
          </p>
        </div>
      )}

      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Billing Information</h3>
        <div className="text-white/60">
          <p>{invoice.billingInformation.name}</p>
          <p>{invoice.billingInformation.address}</p>
          <p>
            {invoice.billingInformation.city}, {invoice.billingInformation.state}{' '}
            {invoice.billingInformation.zipCode}
          </p>
          <p className="mt-2">
            Stellar Address: {invoice.billingInformation.stellarAddress}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => onViewOrder(invoice.id)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0E0E1B] text-white rounded-lg hover:bg-[#0E0E1B]/80 border border-white/20"
        >
          <EyeIcon className="w-5 h-5" />
          View Related Order
        </button>
        <button
          onClick={() => onContactSeller(invoice.id)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0E0E1B] text-white rounded-lg hover:bg-[#0E0E1B]/80 border border-white/20"
        >
          <MessageCircleIcon className="w-5 h-5" />
          Contact Seller
        </button>
      </div>
    </div>
  );
}; 