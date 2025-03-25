import { Button } from "@/components/ui/button"
import CardContainer from "./card-container"

export default function Subscription() {
  return (
    <CardContainer title="Subscription">
      <div className="bg-zinc-700 bg-opacity-30 border border-zinc-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Premium Buyer Plan</h3>
          <div className="text-lg text-[#9333EA] font-medium">25 XLM / month</div>
        </div>

        <p className="text-gray-400 mb-6">Early access to drops, exclusive NFTs, and priority support</p>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">Next billing date: April 1, 2024</div>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-gray-300 hover:bg-[#252538] hover:text-white"
          >
            Manage
          </Button>
        </div>
      </div>
    </CardContainer>
  )
}

