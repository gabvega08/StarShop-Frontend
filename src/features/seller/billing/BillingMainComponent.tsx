"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ConnectWalletButton } from '@/shared/components/ui';
import { WalletCard } from './WalletCard';
import { TransactionHistory } from './TransactionHistory';
import { CurrentPlan } from './CurrentPlan';
import { ManualPayment } from './ManualPayment';
import { MOCK_WALLET, MOCK_TRANSACTIONS, CURRENT_PLAN } from './constants';
import { useUserWalletAddress } from '@/shared/stores';
import { getPublicKey } from '@/shared/utils/wallet';

interface RealWalletData {
  address: string;
  balance: string;
  isConnected: boolean;
  isVerified: boolean;
}

interface StellarBalance {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

interface StellarAccountResponse {
  id: string;
  account_id: string;
  sequence: string;
  balances: StellarBalance[];
  thresholds: {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
  };
  flags: {
    auth_required: boolean;
    auth_revocable: boolean;
  };
}

export function BillingMainComponent() {
  const [realWalletData, setRealWalletData] = useState<RealWalletData | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const storedWalletAddress = useUserWalletAddress();

  const fetchXLMBalance = async (walletAddress: string) => {
    try {
      setIsLoadingBalance(true);
      setApiError('');
      
      if (!walletAddress || !walletAddress.match(/^G[A-Z2-7]{55}$/)) {
        throw new Error('Invalid Stellar address format');
      }

      console.log('Fetching balance for address:', walletAddress);

      const horizonUrl = 'https://horizon.stellar.org';
      const response = await fetch(`${horizonUrl}/accounts/${walletAddress}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn('Account not found on Stellar network - may be unfunded');
          return '0.0000';
        }
        throw new Error(`Horizon API error: ${response.status} ${response.statusText}`);
      }

      const accountData: StellarAccountResponse = await response.json();
      console.log('Account data received:', accountData);

      const xlmBalance = accountData.balances?.find(
        (balance: StellarBalance) => balance.asset_type === 'native'
      );

      if (!xlmBalance) {
        console.warn('No native XLM balance found');
        return '0.0000';
      }

      const balanceAmount = parseFloat(xlmBalance.balance);
      console.log('XLM Balance found:', balanceAmount);

      return balanceAmount.toFixed(4);
    } catch (error: unknown) {
      console.error('Error fetching XLM balance:', error);

      if (typeof error === 'object' && error !== null) {
        const err = error as { name?: string; message?: string };
        if (err.name === 'TimeoutError') {
          setApiError('Request timeout - Stellar network may be slow');
        } else if (err.message?.includes('fetch')) {
          setApiError('Network error - please check your internet connection');
        } else {
          setApiError(`Balance fetch failed: ${err.message}`);
        }
      } else {
        setApiError('Balance fetch failed: Unknown error');
      }

      return '0.0000';
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const verifyWalletConnection = async (address: string) => {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Wallet verification timeout')), 5000)
      );
      
      const verifyPromise = getPublicKey();
      const publicKey = await Promise.race([verifyPromise, timeoutPromise]);
      
      const isValid = publicKey === address;
      console.log('Wallet verification:', { publicKey, address, isValid });
      return isValid;
    } catch (error) {
      console.error('Failed to verify wallet connection:', error);
      return true;
    }
  };

  // Handle wallet connection
  const handleWalletConnected = async (address: string) => {
    console.log('Wallet connected:', address);
    
    setRealWalletData({
      address: address,
      balance: '0.0000',
      isConnected: true,
      isVerified: false
    });

    try {
      const [balance, isVerified] = await Promise.allSettled([
        fetchXLMBalance(address),
        verifyWalletConnection(address)
      ]);

      setRealWalletData({
        address: address,
        balance: balance.status === 'fulfilled' ? balance.value : '0.0000',
        isConnected: true,
        isVerified: isVerified.status === 'fulfilled' ? isVerified.value : false
      });

    } catch (error) {
      console.error('Error during wallet setup:', error);
      setRealWalletData({
        address: address,
        balance: '0.0000',
        isConnected: true,
        isVerified: false
      });
    }
  };

  const handleRefreshBalance = async () => {
    if (realWalletData?.address) {
      try {
        const balance = await fetchXLMBalance(realWalletData.address);
        setRealWalletData(prev => prev ? {...prev, balance} : null);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  };

  const handlePaymentSent = (txHash: string) => {
    console.log('Payment sent with hash:', txHash);
    setApiError('');
    setTimeout(async () => {
      try {
        await handleRefreshBalance();
      } catch (error) {
        console.error('Error refreshing balance after payment:', error);
      }
    }, 3000);
  };

  const handleWalletDisconnected = () => {
    console.log('Wallet disconnected');
    setRealWalletData(null);
    setApiError('');
  };

  useEffect(() => {
    if (storedWalletAddress && !realWalletData) {
      const timer = setTimeout(() => {
        handleWalletConnected(storedWalletAddress);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [storedWalletAddress, realWalletData]);

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getWalletDisplayData = () => {
    if (!realWalletData) {
      return null;
    }

    return {
      address: formatWalletAddress(realWalletData.address),
      balance: realWalletData.balance,
      isConnected: realWalletData.isConnected,
      isVerified: realWalletData.isVerified,
      fullAddress: realWalletData.address
    };
  };

  const walletDisplayData = getWalletDisplayData();
  const isWalletConnected = realWalletData?.isConnected || false;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/background-image-starshop.png)' }}
    >
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="max-w-6xl mt-3 mx-auto flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">Stellar XLM Billing</h1>
          
          {/* Replace the old button with ConnectWalletButton */}
          <div className="flex items-center gap-4">
            {isWalletConnected && walletDisplayData && (
              <div className="text-white text-sm">
                <span className="opacity-75">Connected: </span>
                <span className="font-mono">{walletDisplayData.address}</span>
                {walletDisplayData.isVerified && (
                  <span className="ml-2 text-green-400">✓ Verified</span>
                )}
              </div>
            )}
            
            <ConnectWalletButton
              className="bg-purple-600 hover:bg-purple-700"
              size="md"
              onWalletConnected={handleWalletConnected}
              onWalletDisconnected={handleWalletDisconnected}
            />
          </div>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
              <p className="text-sm">
                <strong>API Error:</strong> {apiError}
              </p>
            </div>
          </div>
        )}

        {/* Wallet Connection Status */}
        {!isWalletConnected && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
              <p className="text-sm">
                <strong>Wallet not connected.</strong> Please connect your Stellar wallet to view real balance and transaction data.
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Connected Wallet - Show real data if connected, mock data otherwise */}
          <WalletCard 
            wallet={walletDisplayData} 
            isLoading={isLoadingBalance}
            isRealData={isWalletConnected}
            onRefreshBalance={handleRefreshBalance}
          />

          {/* Transaction History - You may want to fetch real transactions here too */}
          <TransactionHistory 
            transactions={[]}
            walletConnected={isWalletConnected}
            walletAddress={realWalletData?.address}
          />

          {/* Current Plan */}
          <CurrentPlan plan={CURRENT_PLAN} />

          {/* Manual Payment - Pass wallet info if needed */}
          <ManualPayment 
            walletConnected={isWalletConnected}
            walletAddress={realWalletData?.address}
            walletBalance={realWalletData ? `${realWalletData.balance} XLM` : undefined}
            onPaymentSent={handlePaymentSent}
          />
        </div>
      </div>
    </div>
  );
}