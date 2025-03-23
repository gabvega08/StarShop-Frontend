// pages/nft-collection.tsx
import React, { useState } from "react";
import Head from "next/head";
import StatsCard from "./StatsCard ";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import {
  RiVipDiamondLine,
  RiTShirtLine,
  RiCoupon3Line,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

interface NFTItem {
  id: string;
  name: string;
  type: "clothing" | "coupon" | "other";
  imageUrl: string;
  rarity: string;
}

const NFTCollection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

 
  const nftItems: NFTItem[] = [
    {
      id: "1",
      name: "Cosmic Hoodie",
      type: "clothing",
      imageUrl: "/nft-hoodie.png",
      rarity: "Rare",
    },
    {
      id: "2",
      name: "Galaxy Shirt",
      type: "clothing",
      imageUrl: "/nft-shirt.png",
      rarity: "Common",
    },
    {
      id: "3",
      name: "50% Off Coupon",
      type: "coupon",
      imageUrl: "/nft-coupon.png",
      rarity: "Epic",
    },
  ];

  const filteredItems = nftItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNFTs = nftItems.length;
  const clothingRewards = nftItems.filter(
    (item) => item.type === "clothing"
  ).length;
  const redeemableCoupons = nftItems.filter(
    (item) => item.type === "coupon"
  ).length;
  const estimatedValue = 450; 

  return (
    <div className=" text-white">
     

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button className="flex items-center text-white/80 hover:text-white">
            <FaArrowLeft className="w-3 h-6" />
            <span className="ml-2 text-lg font-medium">My NFT Collection</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            icon={<RiVipDiamondLine className="w-5 h-5 text-purple-400" />}
            title="Total NFTs"
            value={`${totalNFTs}`}
            bgColor="bg-gray-900"
          />
          <StatsCard
            icon={<RiTShirtLine className="w-5 h-5 text-blue-400" />}
            title="Clothing Rewards"
            value={`${clothingRewards}`}
            bgColor="bg-gray-900"
          />
          <StatsCard
            icon={<RiCoupon3Line className="w-5 h-5 text-yellow-400" />}
            title="Redeemable Coupons"
            value={`${redeemableCoupons}`}
            bgColor="bg-gray-900"
          />
          <StatsCard
            icon={
              <RiMoneyDollarCircleLine className="w-5 h-5 text-green-400" />
            }
            title="Estimated Value"
            value={`${estimatedValue} XLM`}
            bgColor="bg-gray-900"
          />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search NFTs..."
              className="w-full bg-[#1a1b1e]/30 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-purple-600" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <IoGridOutline className="w-6 h-6" />
            </button>
            <button
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-purple-600" : " border border-gray-400 "
              }`}
              onClick={() => setViewMode("list")}
            >
              <IoListOutline className="w-6 h-6" />
            </button>
            <button className="flex items-center  space-x-2 border  border-gray-400 border-1 px-4 py-2 rounded-lg">
              <FaFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};




export default NFTCollection;
