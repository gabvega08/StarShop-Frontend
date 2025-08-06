'use client';

import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import {
  connectWallet,
  disconnectWallet,
  getPublicKey,
} from '@/shared/utils/wallet';
import { useSetWalletAddress } from '@/shared/stores';

interface ConnectWalletButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onWalletConnected?: (address: string) => void;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'md',
  onWalletConnected,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const setWalletAddressStore = useSetWalletAddress();

  // Removed automatic connection check to prevent auto-connecting

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connectWallet((address: string) => {
        setIsConnected(true);
        setWalletAddress(address);
        setWalletAddressStore(address);
        if (onWalletConnected) {
          onWalletConnected(address);
        }
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnectWallet();
      setIsConnected(false);
      setWalletAddress('');
      setWalletAddressStore('');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const getButtonClasses = () => {
    const baseClasses =
      'flex items-center gap-2 font-medium transition-all duration-200 rounded-lg';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      default: isConnected
        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
        : 'bg-sidebarActive hover:bg-sidebarActive/90 text-white shadow-lg shadow-sidebarActive/30',
      outline: isConnected
        ? 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
        : 'border border-sidebarActive text-sidebarActive hover:bg-sidebarActive hover:text-white',
      ghost: isConnected
        ? 'text-red-600 hover:bg-red-600/10'
        : 'text-sidebarActive hover:bg-sidebarActive/10',
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'Disconnect Wallet';
    return 'Connect Wallet';
  };



  const getWalletAddress = () => {
    if (!walletAddress) return '';
    return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className={getButtonClasses()}
      >
        <Wallet className={`w-4 h-4 ${size === 'lg' ? 'w-5 h-5' : ''}`} />
        {getButtonText()}
      </button>

      {isConnected && walletAddress && (
        <div className="text-xs text-gray-400 bg-custom-light-card-background px-2 py-1 rounded">
          {getWalletAddress()}
        </div>
      )}
    </div>
  );
};
