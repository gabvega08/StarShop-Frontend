/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import type { Transaction } from './types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  walletConnected?: boolean;
  walletAddress?: string;
}

interface StellarOperation {
  id: string;
  type: string;
  type_i: number;
  amount?: string;
  asset_type?: string;
  from?: string;
  to?: string;
  account?: string;
  into?: string;
  source_account?: string;
  created_at: string;
}

interface StellarTransaction {
  id: string;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  fee_account: string;
  successful: boolean;
  result_code: number;
  result_code_s: string;
  fee_charged: string;
  max_fee: string;
  operation_count: number;
  envelope_xdr: string;
  result_xdr: string;
  result_meta_xdr: string;
  fee_meta_xdr: string;
  memo_type: string;
  memo?: string;
  signatures: string[];
  _links: {
    operations: { href: string };
    effects: { href: string };
    precedes: { href: string };
    succeeds: { href: string };
  };
}

interface StellarTransactionsResponse {
  _links: {
    self: { href: string };
    next: { href: string };
    prev: { href: string };
  };
  _embedded: {
    records: StellarTransaction[];
  };
}

export function TransactionHistory({ 
  transactions, 
  walletConnected = false,
  walletAddress 
}: TransactionHistoryProps) {
  const [realTransactions, setRealTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchRealTransactions = async () => {
    if (!walletAddress || !walletConnected) return;

    try {
      setIsLoadingTransactions(true);
      setError('');

      if (!walletAddress.match(/^G[A-Z2-7]{55}$/)) {
        throw new Error('Invalid Stellar address format');
      }

      console.log('Fetching transactions for address:', walletAddress);

      const horizonUrl = 'https://horizon.stellar.org';
      
      const response = await fetch(
        `${horizonUrl}/accounts/${walletAddress}/transactions?limit=20&order=desc&include_failed=true`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/hal+json',
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(15000)
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn('Account not found - no transactions available');
          setRealTransactions([]);
          return;
        }
        throw new Error(`Horizon API error: ${response.status} ${response.statusText}`);
      }

      const data: StellarTransactionsResponse = await response.json();
      console.log('Transactions data received:', data);

      if (!data._embedded || !data._embedded.records || data._embedded.records.length === 0) {
        console.log('No transactions found for this account');
        setRealTransactions([]);
        return;
      }

      const transformedTransactions: Transaction[] = await Promise.all(
        data._embedded.records.slice(0, 10).map(async (tx: StellarTransaction) => {
          let transactionName = 'XLM Transaction';
          let amount = '0.0000';

          try {
            const opsResponse = await fetch(tx._links.operations.href, {
              headers: {
                'Accept': 'application/hal+json',
              },
              signal: AbortSignal.timeout(10000)
            });

            if (opsResponse.ok) {
              const opsData = await opsResponse.json();
              if (opsData._embedded && opsData._embedded.records.length > 0) {
                const operation = opsData._embedded.records[0] as StellarOperation;
                transactionName = getTransactionName(operation.type);
                amount = operation.amount || '0.0000';
              }
            }
          } catch (opError) {
            console.warn('Failed to fetch operation details:', opError);
          }

          return {
            id: tx.hash,
            name: transactionName,
            date: new Date(tx.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            amount: parseFloat(amount).toFixed(4),
            status: tx.successful ? 'Confirmed' : 'Failed',
            hash: tx.hash
          };
        })
      );

      console.log('Transformed transactions:', transformedTransactions);
      setRealTransactions(transformedTransactions);

    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      
      if (error.name === 'TimeoutError') {
        setError('Request timeout - Stellar network may be slow');
      } else if (error.message?.includes('fetch')) {
        setError('Network error - please check your internet connection');
      } else {
        setError(`Failed to load transactions: ${error.message}`);
      }
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const getTransactionName = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'payment': 'XLM Payment',
      'create_account': 'Account Created',
      'change_trust': 'Trust Line Changed',
      'allow_trust': 'Trust Allowed',
      'account_merge': 'Account Merged',
      'manage_data': 'Data Management',
      'bump_sequence': 'Sequence Bumped',
      'manage_buy_offer': 'Buy Offer',
      'manage_sell_offer': 'Sell Offer',
      'create_passive_sell_offer': 'Passive Sell Offer',
      'path_payment_strict_receive': 'Path Payment (Receive)',
      'path_payment_strict_send': 'Path Payment (Send)',
      'set_options': 'Account Options',
      'inflation': 'Inflation',
      'manage_offer': 'Manage Offer',
      'path_payment': 'Path Payment',
    };
    return typeMap[type] || `${type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
  };

  const handleViewTransaction = (hash?: string) => {
    if (!hash) return;
    const explorerUrl = `https://stellar.expert/explorer/public/tx/${hash}`;
    window.open(explorerUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (walletConnected && walletAddress) {
      const timer = setTimeout(() => {
        fetchRealTransactions();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [walletConnected, walletAddress]);

  const displayTransactions = walletConnected ? realTransactions : [];

  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            XLM Transaction History
          </h2>
          <div className="flex items-center gap-4 mt-2">
            {walletConnected && realTransactions.length > 0 && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Live Data</span>
              </div>
            )}
            {walletConnected && realTransactions.length === 0 && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>No Transactions</span>
              </div>
            )}
            {!walletConnected && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Wallet Not Connected</span>
              </div>
            )}
          </div>
        </div>
        
        {walletConnected && (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
            onClick={fetchRealTransactions}
            disabled={isLoadingTransactions}
          >
            {isLoadingTransactions ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
        )}
      </div>

      {!walletConnected && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg">
          <p className="text-sm">
            <strong>Wallet not connected.</strong> Connect your wallet to view transaction history.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
          <p className="text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {isLoadingTransactions && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin mr-3" />
          <span className="text-white">Loading transaction history...</span>
        </div>
      )}

      {!isLoadingTransactions && (
        <div className="space-y-4">
          {displayTransactions.length > 0 ? (
            displayTransactions.map((transaction, index) => (
              <div
                key={transaction.id || index}
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
                  <p className="text-white font-medium">{transaction.name}</p>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                  {(transaction as any).hash && walletConnected && (
                    <p className="text-gray-500 text-xs mt-1 font-mono">
                      Hash: {(transaction as any).hash.slice(0, 8)}...
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-3 md:mt-0">
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {transaction.amount} XLM
                    </p>
                    <p className={`text-sm ${
                      transaction.status === 'Confirmed' ? 'text-green-400' : 
                      transaction.status === 'Failed' ? 'text-red-400' : 
                      'text-yellow-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                  <ExternalLink 
                    className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" 
                    onClick={() => handleViewTransaction((transaction as any).hash)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {walletConnected 
                  ? 'No transactions found for this wallet.' 
                  : 'Connect your wallet to view transaction history.'
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}