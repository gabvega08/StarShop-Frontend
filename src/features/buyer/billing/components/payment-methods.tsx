'use client';
import { PlusIcon, Wallet } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface PaymentMethodsProps {
  onAddPaymentMethod?: () => void;
}

export function PaymentMethods({ onAddPaymentMethod }: PaymentMethodsProps) {
  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">Payment Methods</h2>

      <div className="bg-[#A855F71A] rounded-lg p-4 border border-[#A855F71A]/20 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 mr-3">
              <Wallet className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="text-white font-medium">Stellar XLM</div>
              <div className="text-gray-400 text-sm">
                Default payment method
              </div>
            </div>
          </div>
          <span className=" text-white/60 text-sm">Default</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent border-white/20 text-white hover:bg-gray-800 hover:text-white"
        onClick={onAddPaymentMethod}
      >
        <PlusIcon className="h-5 w-5" />
        Add Payment Method
      </Button>
    </div>
  );
}
