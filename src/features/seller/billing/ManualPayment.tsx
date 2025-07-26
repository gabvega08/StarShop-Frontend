"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/Input"

export function ManualPayment() {
  const [amount, setAmount] = useState("0.0")
  const [memo, setMemo] = useState("")

  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <h2 className="text-white text-lg font-medium mb-6">Make a Manual Payment</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">XLM Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Memo (Optional)</label>
            <Input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              placeholder="Enter memo"
            />
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium">
          Send XLM Payment
        </Button>
      </div>
    </div>
  )
}
