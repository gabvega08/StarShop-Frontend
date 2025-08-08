'use client';

import React from 'react';
import { ChevronsUpDown, Copy } from 'lucide-react';
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
  useSetWalletAddress,
} from '@/shared/stores/userStore';
import { disconnectWallet } from '@/shared/utils/wallet';

interface UserWalletMenuProps {
  className?: string;
}

export const UserWalletMenu: React.FC<UserWalletMenuProps> = ({ className = '' }) => {
  const walletAddress = useUserWalletAddress();
  const userName = useUserName();
  const setWalletAddress = useSetWalletAddress();

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);
  const formatAddress = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Not connected';

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setWalletAddress('');
    } catch {
      console.error('Failed to disconnect wallet');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex w-full items-center gap-3 rounded-lg border border-sidebarBorder bg-tabBackground px-3 py-2 text-left hover:bg-sidebarActive/10 ${className}`}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-white">
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
              <div className="text-sm font-semibold text-white">
                {userName || 'Without Name'}
              </div>
              <div className="flex items-center gap-2">
                <span className="truncate text-xs text-sidebarText max-w-[12rem]">
                  {walletAddress || 'Not connected'}
                </span>
                {walletAddress && (
                  <button
                    onClick={() => handleCopy(walletAddress)}
                    className="p-1.5 rounded-md hover:bg-sidebarActive/20"
                    aria-label="Copy address"
                  >
                    <Copy className="h-4 w-4 text-sidebarText" />
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
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-red-400 hover:text-red-300"
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
  );
};