'use client';

import { InvoiceList } from '@/components/invoices/InvoiceList';
import { Invoice } from '@/lib/types/invoice';

// Sample data - replace with actual data from your API
const sampleInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    invoiceDate: '2024-03-15',
    dueDate: '2024-03-22',
    status: 'paid',
    items: [
      {
        name: 'Premium Hoodie (Black)',
        size: 'L',
        quantity: 1,
        amount: 80,
        currency: 'XLM',
      },
    ],
    shipping: {
      method: 'Standard Delivery',
      cost: 5,
      currency: 'XLM',
    },
    subtotal: 80,
    tax: 0,
    total: 85,
    currency: 'XLM',
    paymentDetails: {
      received: true,
      date: '2024-03-15',
      transactionId: 'TX123456789',
      method: 'Stellar XLM',
    },
    billingInformation: {
      name: 'Matias Aguilar',
      address: '123 Crypto Street',
      city: 'Blockchain City',
      state: 'BC',
      zipCode: '12345',
      stellarAddress: 'GBCXF...AQTLA',
    },
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    invoiceDate: '2024-03-16',
    dueDate: '2024-03-23',
    status: 'pending',
    items: [
      {
        name: 'Crypto T-Shirt',
        size: 'M',
        quantity: 2,
        amount: 60,
        currency: 'XLM',
      },
    ],
    shipping: {
      method: 'Express Delivery',
      cost: 10,
      currency: 'XLM',
    },
    subtotal: 60,
    tax: 0,
    total: 70,
    currency: 'XLM',
    paymentDetails: {
      received: false,
    },
    billingInformation: {
      name: 'John Doe',
      address: '456 Blockchain Ave',
      city: 'Crypto Valley',
      state: 'CV',
      zipCode: '67890',
      stellarAddress: 'GDXYZ...MNOPQ',
    },
  },
];

export default function InvoicesPage() {
  return (
    <div className="container-fluid px-4 py-8">
      <InvoiceList invoices={sampleInvoices} />
    </div>
  );
} 