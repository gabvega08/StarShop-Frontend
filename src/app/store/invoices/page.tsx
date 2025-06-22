'use client';
import { InvoiceList } from '@/features/store/invoices/components/invoice-list';
import { sampleInvoices } from '@/features/store/invoices/constants/sample-invoices';

export default function InvoicesPage() {
  return (
    <div className="container-fluid px-4 py-8">
      <InvoiceList invoices={sampleInvoices} />
    </div>
  );
} 