import { ChevronLeft } from 'lucide-react';

export function InvoicesHeader() {
  return (
    <div className="flex items-center gap-3">
      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
        <ChevronLeft className="w-5 h-5 text-gray-400" />
      </button>
      <h1 className="text-2xl font-semibold text-white">My Invoices</h1>
    </div>
  );
}
