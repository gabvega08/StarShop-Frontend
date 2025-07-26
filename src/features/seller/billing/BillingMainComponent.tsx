import { Plus } from "lucide-react"
import { Button } from "@/shared/components/ui/button" //check
import { WalletCard } from "./WalletCard"
import { TransactionHistory } from "./TransactionHistory"
import { CurrentPlan } from "./CurrentPlan"
import { ManualPayment } from "./ManualPayment"
import { MOCK_WALLET, MOCK_TRANSACTIONS, CURRENT_PLAN } from "./constans/index"

export function BillingMainComponent() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/background-image-starshop.png)" }}
    >
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="max-w-6xl mt-3 mx-auto flex items-center justify-between mb-8">
            <h1 className="text-white text-2xl font-bold">Stellar XLM Billing</h1>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Connect Stellar Wallet</span>
            </Button>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Connected Wallet */}
            <WalletCard wallet={MOCK_WALLET} />

            {/* Transaction History */}
            <TransactionHistory transactions={MOCK_TRANSACTIONS} />

            {/* Current Plan */}
            <CurrentPlan plan={CURRENT_PLAN} />

            {/* Manual Payment */}
            <ManualPayment />
          </div>
        </div>
      </div>
  )
}
