import CardContainer from "./card-container"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/Input"

export default function SendXLM() {
  return (
    <CardContainer title="Send XLM">
      <div className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm text-gray-400 mb-2">
            Recipient Address
          </label>
          <Input
            id="recipient"
            placeholder="G..."
            className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm text-gray-400 mb-2">
            Amount (XLM)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="0.0"
            className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
          />
        </div>

        <div>
          <label htmlFor="memo" className="block text-sm text-gray-400 mb-2">
            Memo (Optional)
          </label>
          <Input
            id="memo"
            placeholder="Add a memo"
            className="bg-zinc-700 bg-opacity-30 border-zinc-700 text-white focus:border-[#9333EA] focus:ring-[#9333EA]"
          />
        </div>

        <Button className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white mt-4">Send Payment</Button>
      </div>
    </CardContainer>
  )
}

