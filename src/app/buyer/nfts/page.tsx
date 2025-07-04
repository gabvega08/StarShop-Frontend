'use client';

import { NftsPage } from '@/features/buyer/nfts';
import {
  MOCK_STATS,
  NFT_FILTERS,
  NFT_TABS,
  MOCK_NFTS,
  MOCK_EXCLUSIVE_REWARDS,
  MOCK_VALUABLE_NFTS,
} from '@/features/buyer/nfts';

export default function Page() {
  return (
    <NftsPage
      stats={MOCK_STATS}
      filters={NFT_FILTERS}
      tabs={NFT_TABS}
      nfts={MOCK_NFTS}
    />
  );
}
