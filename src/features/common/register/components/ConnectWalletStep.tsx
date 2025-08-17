'use client';

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Wallet, Shield, LogOut } from 'lucide-react';
import { ConnectWalletButton } from '@/shared/components/ui';

interface ConnectWalletStepProps {
  onWalletConnected: (address: string) => void;
  onWalletDisconnected?: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
}

export const ConnectWalletStep: React.FC<ConnectWalletStepProps> = ({
  onWalletConnected,
  onWalletDisconnected,
  isWalletConnected,
  walletAddress,
}) => {
  const handleWalletDisconnected = () => {
    if (onWalletDisconnected) {
      onWalletDisconnected();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border border-sidebarActive rounded-lg p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-sidebarActive/10 rounded-full">
            <Wallet className="w-8 h-8 text-sidebarActive" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isWalletConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
          </h1>
          <p className="text-gray-300 text-base">
            {isWalletConnected 
              ? 'Your Stellar wallet is connected and ready to use'
              : 'Connect your Stellar wallet to complete your registration'
            }
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
                onWalletDisconnected={handleWalletDisconnected}
              />
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium bg-green-600 text-white rounded-lg">
                  <Shield className="w-5 h-5" />
                  Wallet Connected
                </div>
                
                <div className="flex justify-center">
                  <ConnectWalletButton
                    variant="outline"
                    size="md"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onWalletConnected={onWalletConnected}
                    onWalletDisconnected={handleWalletDisconnected}
                  />
                </div>
              </div>
            )}
          </div>

          {isWalletConnected && walletAddress && (
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">
                  Wallet Connected Successfully!
                </span>
              </div>
              <p className="text-green-300 text-sm">
                Your wallet is now connected and ready to use with StarShop.
              </p>
              <p className="text-green-300 text-xs mt-2 font-mono break-all">
                {walletAddress.slice(0, 12)}...{walletAddress.slice(-12)}
              </p>
            </div>
          )}

          {isWalletConnected && (
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Security Information</span>
              </div>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Your wallet connection is secure and encrypted</li>
                <li>• You can disconnect at any time</li>
                <li>• No private keys are stored on our servers</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};