"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/Input"

interface AddPaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPaymentMethod: (walletAddress: string) => void
}

export default function AddPaymentMethodModal({ isOpen, onClose, onAddPaymentMethod }: AddPaymentMethodModalProps) {
  const [walletAddress, setWalletAddress] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (walletAddress.trim()) {
      onAddPaymentMethod(walletAddress)
      setWalletAddress("")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0F0E1D] border border-zinc-700 rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Payment Method</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="wallet-address" className="block text-sm text-gray-400 mb-2">
              Paste Wallet Address
            </label>
            <Input
              id="wallet-address"
              value={walletAddress}
              onChange={(e: any) => setWalletAddress(e.target.value)}
              placeholder="G..."
              className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-gray-300 hover:bg-[#252538] hover:text-white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#9333EA] hover:bg-[#7928CA] text-white"
              disabled={!walletAddress.trim()}
            >
              Add Payment Method
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

