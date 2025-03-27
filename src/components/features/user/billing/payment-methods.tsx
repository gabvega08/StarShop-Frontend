"use client"

import { useState } from "react"
import { Plus, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import CardContainer from "./card-container"
import AddPaymentMethodModal from "./add-payment-method-modal"

export default function PaymentMethods() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Stellar XLM",
      address: "GBCXF...AQTLA",
      isDefault: true,
    },
  ])

  const handleAddPaymentMethod = (walletAddress: string) => {
    const newPaymentMethod = {
      id: Date.now(),
      name: "Stellar XLM",
      address: walletAddress,
      isDefault: false,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
  }

  return (
    <>
      <CardContainer title="Payment Methods">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-zinc-700 bg-opacity-30 border border-zinc-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Wallet className="h-6 w-6 text-[#9333EA] mr-3" />
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-white">
                    {method.isDefault ? "Default payment method" : method.address}
                  </div>
                </div>
              </div>
              {method.isDefault && <div className="text-sm text-gray-400">Default</div>}
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full border-zinc-700 text-white bg-[#252538] hover:bg-[#303045]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </CardContainer>

      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPaymentMethod={handleAddPaymentMethod}
      />
    </>
  )
}

