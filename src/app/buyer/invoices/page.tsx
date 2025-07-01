import { InvoicesPage } from '@/features/buyer/invoices/components/InvoicesPage';

export default function BuyerInvoicesPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent p-6 sm:p-4 md:p-6">
      <div className="w-full max-w-4xl rounded-lg border border-white/10 bg-transparent shadow-lg">
        <InvoicesPage />
      </div>
    </div>
  );
}
