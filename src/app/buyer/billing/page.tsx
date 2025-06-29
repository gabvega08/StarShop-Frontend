'use client';

import { StellarWallet } from '@/features/buyer/billing/components/stellar-wallet';
import { TransactionHistory } from '@/features/buyer/billing/components/transaction-history';
import { PaymentMethods } from '@/features/buyer/billing/components/payment-methods';
import { Subscription } from '@/features/buyer/billing/components/subscription';
import { SendXLM } from '@/features/buyer/billing/components/send-xlm';

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
            <Subscription />
            <SendXLM />
          </div>
        </div>
      </div>
    </div>
  );
}
