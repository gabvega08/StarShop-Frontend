'use client';
import { Button } from '@/shared/components/ui/button';

export function Subscription() {
  const nextBillingDate = new Date('2024-04-01');

  const formattedDate = nextBillingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleManageSubscription = () => {
    console.log('Managing subscription...');
  };
  return (
    <div className="bg-[#0F0E1D]/50 rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">Subscription</h2>

      <div className="bg-[#A855F71A] rounded-lg p-4 border border-[#A855F71A]/20 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-white font-medium mb-1">
              Premium Buyer Plan
            </div>
            <div className="text-gray-300 text-sm">
              Early access to drops, exclusive NFTs, and priority support
            </div>
          </div>
          <div className="text-right">
            <div className="text-purple-400 font-semibold text-lg">
              25 XLM / month
            </div>
          </div>
        </div>

        <hr className="border-t border-[#A855F733] my-6" />

        <div className="flex items-center justify-between mt-4">
          <div className="text-gray-400 text-sm">
            Next billing date: {formattedDate}
          </div>
          <Button
            variant="default"
            size="sm"
            className="hover:text-white hover:bg-gray-700 bg-[#0E0E1B] text-sm"
            onClick={handleManageSubscription}
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
}
