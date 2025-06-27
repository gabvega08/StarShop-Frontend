'use client';
import { Button } from '@/shared/components/ui/button';
import { Copy, Plus, Wallet } from 'lucide-react';

export function StellarWallet() {
  const walletAddress = 'GBCXF...AQTLA';
  const xlmBalance = '345.6789';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const handleRefreshBalance = () => {
    // Refresh balance logic
  };

  const handleAddFunds = () => {
    // Add funds logic
  };

  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">Stellar Wallet</h2>

      {/* Wallet Address */}
      <div className="mb-6 ">
        <div className="flex items-center justify-between rounded-lg p-3 bg-white/5">
          <div className="flex items-center gap-x-4">
            <Wallet className="h-8 w-8 text-purple-400" />
            <div className="flex flex-col">
              <span className="text-sm text-white">Wallet Address</span>
              <span className="text-white/60 font-mono">{walletAddress}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-white"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      {/* XLM Balance */}
      <div className="mb-6 ">
        <div className="flex items-center justify-between rounded-lg p-3 bg-white/5">
          <div className="flex flex-col">
            <span className="text-white text-sm">XLM Balance</span>
            <div className="text-3xl font-bold text-purple-400 mb-4">
              {xlmBalance} XLM
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleRefreshBalance}
            className="hover:text-white hover:bg-gray-700 bg-[#0E0E1B] text-sm"
          >
            Refresh Balance
          </Button>
        </div>
      </div>

      {/* Add Funds Button */}
      <Button
        onClick={handleAddFunds}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Funds
      </Button>
    </div>
  );
}
