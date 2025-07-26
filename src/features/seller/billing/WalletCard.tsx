"use client"

import { Copy, ExternalLink, RefreshCw, Wallet } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import type { WalletInfo } from "../../../types/billing"

interface WalletCardProps {
  wallet: WalletInfo
}

export function WalletCard({ wallet }: WalletCardProps) {
  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6">Connected Stellar Wallet</h2>

      <div className="space-y-4">
        <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid transparent';
              }}>
          <div className="flex items-center space-x-3">
            <Wallet className="w-10 h-10 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Wallet Address</p>
              <p className="text-white font-mono">{wallet.address}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </div>

        <div  className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid transparent';
              }}>
          <div>
            <p className="text-gray-400 text-sm">XLM Balance</p>
            <p className="text-purple-400 text-3xl font-bold">{wallet.balance} XLM</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Balance
          </Button>
        </div>
      </div>
    </div>
  )
}
