import { Button } from '@/shared/components/ui/button';
import type { Plan } from './types';

interface CurrentPlanProps {
  plan: Plan;
}

export function CurrentPlan({ plan }: CurrentPlanProps) {
  return (
    <div className="max-w-6xl mt-3 mx-auto p-6 sm:p-8 rounded-2xl shadow-lg outline outline-1 outline-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6">Current Plan</h2>

      <div className="space-y-4 bg-[#a855f71a] border border-[#a855f71a] p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium text-lg">{plan.name}</h3>
            <p className="text-gray-400 text-sm">{plan.description}</p>
          </div>
          <div className="text-right">
            <p className="text-purple-400 font-bold text-lg">{plan.price}</p>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white mt-2">
              Change Plan
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/50">
          <p className="text-gray-400 text-sm">
            Next billing date: {plan.nextBillingDate}
          </p>
        </div>
      </div>
    </div>
  );
}
