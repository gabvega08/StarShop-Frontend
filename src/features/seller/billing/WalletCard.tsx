'use client';

import { Copy, ExternalLink, RefreshCw, Wallet, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import type { WalletInfo } from './types';

interface WalletCardProps {
  wallet: WalletInfo | null;
  isLoading?: boolean;
  isRealData?: boolean;
  onRefreshBalance?: () => void;
}

export function WalletCard({ 
  wallet, 
  isLoading = false, 
  isRealData = false,
  onRefreshBalance 
}: WalletCardProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  // Handle copy wallet address
  const handleCopyAddress = async () => {
    if (!wallet?.address) return;
    
    const addressToCopy = wallet.address;
    
    try {
      await navigator.clipboard.writeText(addressToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  // Handle view on explorer
  const handleViewOnExplorer = () => {
    if (!wallet?.address) return;
    
    const addressToView = wallet.address;
    const explorerUrl = `https://stellar.expert/explorer/public/account/${addressToView}`;
    window.open(explorerUrl, '_blank');
  };

  // Handle refresh balance
  const handleRefreshBalance = () => {
    if (onRefreshBalance) {
      onRefreshBalance();
    }
  };

  if (!wallet) {
    return (
      <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Connect Your Stellar Wallet
        </h2>
        <div className="text-center py-12">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No wallet connected. Please connect your Stellar wallet to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Connected Stellar Wallet
        </h2>
        {isRealData && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Live Data</span>
          </div>
        )}
        {!isRealData && (
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Mock Data</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Wallet Address Section */}
        <div
          className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.border = '1px solid transparent';
          }}
        >
          <div className="flex items-center space-x-3">
            <Wallet className="w-10 h-10 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Wallet Address</p>
              <p className="text-white font-mono text-sm md:text-base">
                {wallet.address}
              </p>
              {wallet.isVerified && (
                <p className="text-green-400 text-xs mt-1">
                  ✓ Connection Verified
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 mt-3 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={handleCopyAddress}
              disabled={!wallet.address}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copySuccess ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
              onClick={handleViewOnExplorer}
              disabled={!wallet.address}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Explorer
            </Button>
          </div>
        </div>

        {/* XLM Balance Section */}
        <div
          className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.border = '1px solid transparent';
          }}
        >
          <div>
            <p className="text-gray-400 text-sm">XLM Balance</p>
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                  <p className="text-purple-400 text-3xl font-bold">Loading...</p>
                </div>
              ) : (
                <p className="text-purple-400 text-3xl font-bold">
                  {typeof wallet.balance === 'string' && wallet.balance.includes('XLM') 
                    ? wallet.balance 
                    : `${wallet.balance} XLM`}
                </p>
              )}
            </div>
            {isRealData && (
              <p className="text-gray-500 text-xs mt-1">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700 mt-3 md:mt-0"
            onClick={handleRefreshBalance}
            disabled={isLoading || !isRealData}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh Balance
          </Button>
        </div>
      </div>
    </div>
  );
}