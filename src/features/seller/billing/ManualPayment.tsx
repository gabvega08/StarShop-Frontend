/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/Input';
import { Loader2, Send, AlertTriangle } from 'lucide-react';

interface ManualPaymentProps {
  walletConnected?: boolean;
  walletAddress?: string;
  walletBalance?: string;
  onPaymentSent?: (txHash: string) => void;
}

export function ManualPayment({ 
  walletConnected = false, 
  walletAddress,
  walletBalance,
  onPaymentSent 
}: ManualPaymentProps) {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Default destination address for payments (replace with your actual address)
  const DEFAULT_DESTINATION = 'GCZJM35NKGVK47BB4SPBDV25477PZYIYPVVG453LPYFNXLS3FGHDXOCM';

  // Validate XLM amount
  const isValidAmount = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 && num <= 10000; // Reasonable limits
  };

  // Validate Stellar address
  const isValidStellarAddress = (address: string): boolean => {
    // Basic Stellar address validation (starts with G and is 56 characters)
    const stellarAddressRegex = /^G[A-Z2-7]{55}$/;
    return stellarAddressRegex.test(address);
  };

  // Check if user has sufficient balance
  const hasSufficientBalance = (): boolean => {
    if (!walletBalance || !amount) return false;
    
    const balance = parseFloat(walletBalance.replace(' XLM', ''));
    const paymentAmount = parseFloat(amount);
    
    // Account for transaction fee (typically 0.00001 XLM)
    return balance >= (paymentAmount + 0.00001);
  };

  // Handle payment submission
  const handleSendPayment = async () => {
    if (!walletConnected || !walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    if (!amount || !isValidAmount(amount)) {
      setError('Please enter a valid XLM amount');
      return;
    }

    if (!hasSufficientBalance()) {
      setError('Insufficient XLM balance for this transaction');
      return;
    }

    const destination = destinationAddress || DEFAULT_DESTINATION;
    if (!isValidStellarAddress(destination)) {
      setError('Invalid destination address');
      return;
    }

    try {
      setIsSending(true);
      setError('');
      setSuccess('');

      // This would integrate with your existing wallet utilities
      // For now, we'll simulate the payment process
      const txHash = await simulatePayment({
        from: walletAddress,
        to: destination,
        amount: amount,
        memo: memo
      });

      setSuccess(`Payment sent successfully! Transaction hash: ${txHash.slice(0, 8)}...`);
      
      // Reset form
      setAmount('');
      setMemo('');
      setDestinationAddress('');

      // Notify parent component
      if (onPaymentSent) {
        onPaymentSent(txHash);
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Payment failed: ${error.message}`);
      } else {
        setError('Payment failed: Unknown error');
      }
    } finally {
      setIsSending(false);
    }
  };

  // Simulate payment (replace with actual Stellar SDK implementation)
  interface PaymentData {
    from: string;
    to: string;
    amount: string;
    memo?: string;
  }

  const simulatePayment = async (paymentData: PaymentData): Promise<string> => {
    // This is where you'd integrate with Stellar SDK
    // Example implementation:
    /*
    import * as StellarSdk from 'stellar-sdk';
    
    const server = new StellarSdk.Server('https://horizon.stellar.org');
    const sourceKeys = StellarSdk.Keypair.fromSecret('SOURCE_SECRET_KEY');
    const destinationId = paymentData.to;
    
    const account = await server.loadAccount(sourceKeys.publicKey());
    const fee = await server.fetchBaseFee();
    
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: fee,
      networkPassphrase: StellarSdk.Networks.PUBLIC
    })
    .addOperation(StellarSdk.Operation.payment({
      destination: destinationId,
      asset: StellarSdk.Asset.native(),
      amount: paymentData.amount,
    }))
    .addMemo(StellarSdk.Memo.text(paymentData.memo || ''))
    .setTimeout(180)
    .build();
    
    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);
    return result.hash;
    */
    
    // For demo purposes, simulate delay and return mock hash
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `mock_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Calculate estimated fee
  const estimatedFee = '0.00001';

  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-medium">
          Make a Manual Payment
        </h2>
        {walletConnected && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Wallet Connected</span>
          </div>
        )}
      </div>

      {/* Wallet Connection Warning */}
      {!walletConnected && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Wallet Not Connected</p>
            <p className="text-sm">Please connect your Stellar wallet to make payments.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
          <p className="text-sm">{success}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Payment Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">
              XLM Amount *
            </label>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              placeholder="0.0"
              step="0.0000001"
              min="0"
              disabled={!walletConnected || isSending}
            />
            {walletBalance && (
              <p className="text-xs text-gray-500 mt-1">
                Available: {walletBalance}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-gray-400 text-sm block mb-2">
              Memo (Optional)
            </label>
            <Input
              type="text"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              placeholder="Enter memo"
              maxLength={28}
              disabled={!walletConnected || isSending}
            />
          </div>
        </div>

        {/* Destination Address */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">
            Destination Address (Optional)
          </label>
          <Input
            type="text"
            value={destinationAddress}
            onChange={e => setDestinationAddress(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
            placeholder={`Default: ${DEFAULT_DESTINATION.slice(0, 8)}...${DEFAULT_DESTINATION.slice(-8)}`}
            disabled={!walletConnected || isSending}
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to use the default payment address
          </p>
        </div>

        {/* Transaction Summary */}
        {amount && parseFloat(amount) > 0 && (
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
            <h3 className="text-white text-sm font-medium mb-2">Transaction Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Payment Amount:</span>
                <span>{amount} XLM</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Network Fee:</span>
                <span>{estimatedFee} XLM</span>
              </div>
              <div className="flex justify-between text-white font-medium pt-1 border-t border-slate-600">
                <span>Total:</span>
                <span>{(parseFloat(amount) + parseFloat(estimatedFee)).toFixed(7)} XLM</span>
              </div>
            </div>
          </div>
        )}

        {/* Send Button */}
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendPayment}
          disabled={
            !walletConnected || 
            isSending || 
            !amount || 
            !isValidAmount(amount) ||
            !hasSufficientBalance()
          }
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Payment...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send XLM Payment
            </>
          )}
        </Button>
      </div>
    </div>
  );
}