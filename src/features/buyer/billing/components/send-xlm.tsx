'use client';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/Input';

export function SendXLM() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const handleSendPayment = () => {
    // Send payment logic
    console.log('Sending payment:', { recipientAddress, amount, memo });
  };

  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">Send XLM</h2>

      <div className="space-y-4">
        {/* Recipient Address */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Recipient Address
          </label>
          <Input
            type="text"
            placeholder="G..."
            value={recipientAddress}
            onChange={e => setRecipientAddress(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Amount (XLM)
          </label>
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Memo */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Memo (Optional)
          </label>
          <Input
            type="text"
            placeholder="Add a memo"
            value={memo}
            onChange={e => setMemo(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendPayment}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mt-6"
          //   disabled={!recipientAddress || !amount}
        >
          Send Payment
        </Button>
      </div>
    </div>
  );
}
