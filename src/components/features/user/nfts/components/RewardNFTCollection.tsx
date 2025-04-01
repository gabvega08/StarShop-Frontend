"use client";

import React, { useState } from "react";
import { LayoutGrid, List, Filter } from "lucide-react";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import NFTGrid from "./NFTGrid";
import { NFTItem } from "./NFTCard";

const nfts: NFTItem[] = [
  {
    id: 1,
    title: "Urban Style Collector",
    subtitle: "Purchase Reward",
    subtitleColor: "bg-[#3B82F61A] text-[#60A5FA]",
    store: "Urban Style Store",
    acquired: "Mar 15, 2024",
    rarity: "Uncommon",
    rarityColor: "bg-[#22C55E33] text-[#4ADE80]",
    category: "Clothing Rewards",
  },
  {
    id: 2,
    title: "Tech Enthusiast",
    subtitle: "Purchase Reward",
    subtitleColor: "bg-[#3B82F61A] text-[#60A5FA]",
    store: "Tech Gadgets",
    acquired: "Mar 15, 2024",
    rarity: "Rare",
    rarityColor: "bg-[#3B82F633] text-[#60A5FA]",
    category: "Other",
  },
  {
    id: 3,
    title: "Fashion Pioneer",
    subtitle: "Achievement",
    subtitleColor: "bg-[#A855F71A] text-[#C084FC]",
    store: "Starshop",
    acquired: "Mar 10, 2024",
    rarity: "Epic",
    rarityColor: "bg-[#A855F733] text-[#C084FC]",
    category: "Achievements",
  },
  {
    id: 4,
    title: "Early Adopter",
    subtitle: "Special Edition",
    subtitleColor: "bg-[#F59E0B1A] text-[#FBBF24]",
    store: "Starshop",
    acquired: "Feb 29, 2024",
    rarity: "Legendary",
    rarityColor: "bg-[#F59E0B33] text-[#FBBF24]",
    category: "Exclusive Items",
  },
  {
    id: 5,
    title: "Eco Warrior",
    subtitle: "Purchase Reward",
    subtitleColor: "bg-[#3B82F61A] text-[#60A5FA]",
    store: "Eco Friendly Shop",
    acquired: "Feb 29, 2024",
    rarity: "Uncommon",
    rarityColor: "bg-[#22C55E33] text-[#4ADE80]",
    category: "Other",
  },
  {
    id: 6,
    title: "Stellar Spender",
    subtitle: "Achievement",
    subtitleColor: "bg-[#A855F71A] text-[#C084FC]",
    store: "Starshop",
    acquired: "Feb 15, 2024",
    rarity: "Rare",
    rarityColor: "bg-[#3B82F633] text-[#60A5FA]",
    category: "Achievements",
  },
];

const tabs = [
  { label: "All NFTs", value: "all" },
  { label: "Clothing Rewards", value: "Clothing Rewards" },
  { label: "Achievements", value: "Achievements" },
  { label: "Exclusive Items", value: "Exclusive Items" },
];

const RewardNFTCollection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter NFTs by active tab
  const filteredNFTs = activeTab === "all" 
    ? nfts 
    : nfts.filter((nft) => nft.category === activeTab);

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-6 gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-purple-600" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-purple-600 text-white"
                : "border border-gray-400 text-white"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-6 h-6" />
          </button>
          <button className="flex items-center space-x-2 border border-gray-400 px-4 py-2 rounded-lg text-white">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/60 shadow-[0_0_16px_rgba(255,255,255,0.25)] bg-transparent">
        <section
          className="w-full text-white rounded-2xl p-6"
          style={{
            backgroundImage: "url('/background-image-starshop.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            {/* NFT Grid */}
            <NFTGrid nfts={filteredNFTs} />
          </div>
        </section>
      </div>
    </>
  );
};

export default RewardNFTCollection;
