'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { NFTStatsCards } from './NFTStatsCards';
import { NFTFilters } from './NFTFilters';
import { NFTTabs } from './NFTTabs';
import { NFTGrid } from './NFTGrid';
import { ExclusiveRewards } from './ExclusiveRewards';
import { ValuableCollection } from './ValuableCollection';
import { NFTStats, NFTFilter, NFTTab, NFT as NFTType, ExclusiveReward, ValuableNFT } from '../types/nft';

interface NftsPageProps {
  stats: NFTStats[];
  filters: NFTFilter[];
  tabs: NFTTab[];
  nfts: NFTType[];
  exclusiveRewards: ExclusiveReward[];
  valuableNfts: ValuableNFT[];
}

export function NftsPage({
  stats,
  filters,
  tabs,
  nfts,
  exclusiveRewards,
  valuableNfts,
}: NftsPageProps) {
  const [currentFilters, setCurrentFilters] = useState<NFTFilter[]>(filters);
  const [currentTabs, setCurrentTabs] = useState<NFTTab[]>(tabs);
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (filterId: string) => {
    setCurrentFilters(prev =>
      prev.map(filter => ({
        ...filter,
        active: filter.id === filterId,
      }))
    );
  };

  const handleTabChange = (tabId: string) => {
    setCurrentTabs(prev =>
      prev.map(tab => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
  };

  const filteredNfts = nfts.filter(nft =>
    nft.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    nft.store.toLowerCase().includes(searchValue.toLowerCase()) ||
    nft.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2 text-white" />
            </Button>
            <h1 className="text-2xl font-bold text-white">My NFT Collection</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <NFTStatsCards stats={stats} />

        {/* Filters */}
        <NFTFilters
          filters={currentFilters}
          onFilterChange={handleFilterChange}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Tabs */}
        <NFTTabs tabs={currentTabs} onTabChange={handleTabChange} />

        {/* NFT Grid */}
        <NFTGrid nfts={filteredNfts} />

        {/* Exclusive Rewards */}
        <ExclusiveRewards />

        {/* Valuable Collection */}
        <ValuableCollection />
      </div>
    </div>
  );
} 