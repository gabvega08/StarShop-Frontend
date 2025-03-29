"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFunds: (amount: number, method: string) => void
}

export default function AddFundsModal({ isOpen, onClose, onAddFunds }: AddFundsModalProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("xlm")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      onAddFunds(Number(amount), paymentMethod)
      setAmount("")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0F0E1D] border border-zinc-700 rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Funds to Wallet</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm text-gray-400 mb-2">
              Amount (XLM)
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="payment-method" className="block text-sm text-gray-400 mb-2">
              Payment Method
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger
                id="payment-method"
                className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
              >
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B1B29] border-zinc-700 text-white">
                <SelectItem value="xlm">Stellar XLM</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
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
              disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
            >
              Add Funds
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

