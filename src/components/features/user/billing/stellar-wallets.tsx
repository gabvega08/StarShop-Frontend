"use client"

import { useState } from "react"
import { Copy, Plus, RefreshCw, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import CardContainer from "./card-container"
import AddFundsModal from "./add-funds-modal"

export default function StellarWallet() {
  const [walletAddress] = useState("GBCXF...AQTLA")
  const [balance, setBalance] = useState("345.6789")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  const handleRefreshBalance = () => {
    const randomAdjustment = (Math.random() * 2 - 1).toFixed(4)
    const newBalance = (Number.parseFloat(balance) + Number.parseFloat(randomAdjustment)).toFixed(4)
    setBalance(newBalance)
  }

  const handleAddFunds = (amount: number, method: string) => {
    console.log(`Adding ${amount} XLM using ${method}`)

    const newBalance = (Number.parseFloat(balance) + amount).toFixed(4)
    setBalance(newBalance)
  }

  return (
    <>
      <CardContainer title="Stellar Wallet">
        <div className="bg-zinc-700 bg-opacity-30 border border-zinc-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-[#9333EA] mr-3" />
              <div>
                <div className="text-sm text-gray-400">Wallet Address</div>
                <div className="text-sm">{walletAddress}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#252538]"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-zinc-700 bg-opacity-30 border border-zinc-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-400">XLM Balance</div>
              <div className="text-2xl font-semibold text-[#9333EA]">{balance} XLM</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#252538]"
              onClick={handleRefreshBalance}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Balance
            </Button>
          </div>
        </div>

        <Button className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </CardContainer>

      <AddFundsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddFunds={handleAddFunds} />
    </>
  )
}

