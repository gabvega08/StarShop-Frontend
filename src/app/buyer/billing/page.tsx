'use client';

import { 
  StellarWallet, 
  TransactionHistory, 
  PaymentMethods, 
  SendXLM 
} from '@/features/buyer/billing';

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <StellarWallet />
            <PaymentMethods />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <TransactionHistory />
            <SendXLM />
          </div>
        </div>
      </div>
    </div>
  );
}
