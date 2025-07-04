import { useState } from 'react';
import { NFTFilter, NFTTab, NFT } from '../types/nft';

export function useNfts(
  initialFilters: NFTFilter[],
  initialTabs: NFTTab[],
  initialNfts: NFT[]
) {
  const [filters, setFilters] = useState<NFTFilter[]>(initialFilters);
  const [tabs, setTabs] = useState<NFTTab[]>(initialTabs);
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (filterId: string) => {
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        active: filter.id === filterId,
      }))
    );
  };

  const handleTabChange = (tabId: string) => {
    setTabs(prev =>
      prev.map(tab => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
  };

  const filteredNfts = initialNfts.filter(
    nft =>
      nft.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      nft.store.toLowerCase().includes(searchValue.toLowerCase()) ||
      nft.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  return {
    filters,
    tabs,
    searchValue,
    filteredNfts,
    handleFilterChange,
    handleTabChange,
    setSearchValue,
  };
}
