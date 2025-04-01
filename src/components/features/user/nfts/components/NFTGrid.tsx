import React from "react";
import NFTCard, { NFTItem } from "./NFTCard";

interface NFTGridProps {
  nfts: NFTItem[];
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-1">
    {nfts.map((nft) => (
      <NFTCard key={nft.id} nft={nft} />
    ))}
  </div>
);

export default NFTGrid;
