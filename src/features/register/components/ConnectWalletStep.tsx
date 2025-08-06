'use client';

import React from 'react';
import { Wallet, Shield, Zap } from 'lucide-react';
import { ConnectWalletButton } from '@/shared/components/ui';

interface ConnectWalletStepProps {
  onWalletConnected: (address: string) => void;
  isWalletConnected: boolean;
  walletAddress?: string;
}

export const ConnectWalletStep: React.FC<ConnectWalletStepProps> = ({
  onWalletConnected,
  isWalletConnected,
  walletAddress,
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border border-sidebarActive rounded-lg p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-sidebarActive/10 rounded-full">
            <Wallet className="w-8 h-8 text-sidebarActive" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Connect Your Wallet
          </h1>
          <p className="text-gray-300 text-base">
            Connect your Stellar wallet to complete your registration
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            {!isWalletConnected ? (
              <ConnectWalletButton 
                variant="default" 
                size="lg" 
                className="mx-auto"
                onWalletConnected={onWalletConnected}
              />
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium bg-green-600 text-white rounded-lg">
                <Shield className="w-5 h-5" />
                Wallet Connected
              </div>
            )}
          </div>

          {isWalletConnected && walletAddress && (
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Wallet Connected Successfully!</span>
              </div>
              <p className="text-green-300 text-sm">
                Your wallet is now connected and ready to use with StarShop.
              </p>
              <p className="text-green-300 text-xs mt-2 font-mono">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}; 