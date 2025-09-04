'use client';

import React from 'react';
import { ChevronsUpDown, Copy } from 'lucide-react';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';
import { ConnectWalletButton } from '@/shared/components/ui';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/shared/components/ui/dropdown-menu';
import {
  useUserWalletAddress,
  useUserName,
  useClearUser,
} from '@/shared/stores/userStore';
import { disconnectWallet } from '@/shared/utils/wallet';
import { useState, useCallback } from 'react';

interface UserWalletMenuProps {
  className?: string;
}

export const UserWalletMenu: React.FC<UserWalletMenuProps> = ({
  className = '',
}) => {
  const router = useRouter();
  const walletAddress = useUserWalletAddress();
  const userName = useUserName();
  const clearUser = useClearUser();

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleCopy = useCallback((text: string) => {
    if (!text) {
      setCopyError('No text to copy');
      return;
    }

    setCopyError(null);

    try {
      const success = copy(text, {
        format: 'text/plain',
        onCopy: () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        },
      });

      if (!success) {
        setCopyError('Failed to copy address');
      }
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
      setCopyError('Failed to copy address');
    }
  }, []);

  const formatAddress = useCallback(
    (addr: string) =>
      addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Not connected',
    []
  );

  const handleDisconnect = useCallback(async () => {
    try {
      // Disconnect the wallet
      await disconnectWallet();
      
      // Clear all user data from the store (this will also clear localStorage due to persistence)
      clearUser();
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      // Even if wallet disconnect fails, we should still clear user data and redirect
      clearUser();
      router.push('/');
    }
  }, [clearUser, router]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`flex w-full items-center gap-3 rounded-lg border border-sidebarBorder bg-tabBackground px-3 py-2 text-left hover:bg-sidebarActive/10 transition-colors duration-200 ${className}`}
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold text-sidebarTitle">
                {userName || 'Without Name'}
              </span>
              <span className="truncate text-xs text-sidebarText">
                {formatAddress(walletAddress)}
              </span>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-sidebarText" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 rounded-lg border border-sidebarBorder bg-sidebar p-0">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-sidebarTitle">
                  {userName || 'Without Name'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs text-sidebarText max-w-[12rem]">
                    {walletAddress || 'Not connected'}
                  </span>
                  {walletAddress && (
                    <button
                      onClick={() => handleCopy(walletAddress)}
                      className="p-1.5 rounded-md hover:bg-sidebarActive/20 transition-colors duration-200"
                      aria-label="Copy address"
                      disabled={copied}
                    >
                      <Copy
                        className={`h-4 w-4 ${
                          copied ? 'text-green-400' : 'text-sidebarText'
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {walletAddress ? (
            <>
              <DropdownMenuItem asChild>
                <button
                  onClick={handleDisconnect}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  Disconnect
                </button>
              </DropdownMenuItem>
            </>
          ) : (
            <div className="px-3 py-3">
              <ConnectWalletButton
                variant="default"
                size="md"
                className="w-full justify-center"
              />
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {copied && (
        <div
          className="fixed bottom-4 right-10 bg-tabBackground border border-sidebarBorder text-sidebarTitle px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2 duration-300"
          style={{ zIndex: 9999 }}
        >
          Address copied to clipboard!
        </div>
      )}

      {copyError && (
        <div
          className="fixed bottom-4 right-10 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2 duration-300"
          style={{ zIndex: 9999 }}
        >
          {copyError}
        </div>
      )}
    </>
  );
};
