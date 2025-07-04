'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { NFTTab } from '../types/nft';

interface NFTTabsProps {
  tabs: NFTTab[];
  onTabChange: (tabId: string) => void;
}

export function NFTTabs({ tabs, onTabChange }: NFTTabsProps) {
  const activeTab = tabs.find(tab => tab.active)?.id || 'all';

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-4 bg-white/10 text-white">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-[#7E22CE] data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
