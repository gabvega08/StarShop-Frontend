import { Download, Eye } from 'lucide-react';
import type { Invoice } from '../types';

interface InvoiceDetailsProps {
  invoice: Invoice;
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Invoice Details</h3>
            <p className="text-gray-400 text-sm">{invoice.invoiceNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 rounded-lg text-white text-sm hover:bg-purple-700 transition-colors">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Invoice Date</p>
            <p className="text-white">{invoice.invoiceDate}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Due Date</p>
            <p className="text-white">{invoice.dueDate}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <p className="text-green-400">{invoice.status}</p>
          </div>
        </div>

        <div className="border border-white/10 rounded-lg overflow-hidden">
          <div className="bg-white/5 px-4 py-3 border-b border-white/10">
            <div className="flex justify-between">
              <span className="text-white font-medium">Item</span>
              <span className="text-white font-medium">Amount</span>
            </div>
          </div>
          <div className="divide-y divide-white/10">
            {invoice.items.map((item, index) => (
              <div key={index} className="px-4 py-3 flex justify-between">
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <p className="text-white">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">{invoice.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Shipping</span>
            <span className="text-white">{invoice.shipping}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Tax</span>
            <span className="text-white">{invoice.tax}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2">
            <span className="text-white font-medium">Total</span>
            <span className="text-white font-medium">{invoice.total}</span>
          </div>
        </div>

        {invoice.paymentReceived && (
          <div className="bg-green-600/10 border border-green-300/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-300 font-medium">
                Payment Received
              </span>
            </div>
            <p className="text-green-300 text-sm mt-1">
              Payment was received on {invoice.paymentDate} via{' '}
              {invoice.paymentMethod}. Transaction ID: {invoice.transactionId}
            </p>
          </div>
        )}

        <div>
          <h4 className="text-white font-medium mb-2">Billing Information</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <p>{invoice.billingInfo.name}</p>
            <p>{invoice.billingInfo.company}</p>
            <p>{invoice.billingInfo.address}</p>
            <p>{invoice.billingInfo.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
            View Related Order
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
