"use client"

import { Check, Store, User} from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import StarShopLanding from "../../../../public/starshop-logos/StarShop-Logo.svg"

export default function StepTwoContent(): JSX.Element {
    const [activeProfile, setActiveProfile] = useState<"buyer" | "seller" | null>(null)

  return (
    <div className="w-full  flex flex-col items-center justify-center p-6">
    <Image src={StarShopLanding} alt="StarShop Logo" width={60} height={60} className="" />

      <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-center mb-2">Choose your profile</h1>
      <p className="text-gray-400 text-center mb-8">Select how you want to use StarShop marketplace</p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setActiveProfile("buyer")}
          className={`group 
            p-6 
            rounded-2xl 
            bg-[#0c0b1d]  
            shadow-[0_0_15px_-3px_rgba(127,79,210,0.2),0_8px_25px_-5px_rgba(127,79,210,0.3)] 
            hover:shadow-[0_0_15px_-3px_rgba(127,79,210,0.3),0_12px_30px_-5px_rgba(127,79,210,0.4)] 
            border border-purple-500/60 
            hover:border-purple-500 
            transition-all 
            duration-300 
            backdrop-blur-sm 
            relative overflow-hidden ${
            activeProfile === "buyer" 
            ? 
            `opacity-100 
            border-purple-500 
            shadow-[0_0_15px_-3px_rgba(127,79,210,0.3),0_12px_30px_-5px_rgba(127,79,210,0.4)]` 
            : `opacity-70`
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 mb-4">
              <User size={24} className="text-purple-400" />
            </div>

            <h3 className="text-xl text-left font-bold text-white mb-2">Buyer</h3>
            <p className="text-sm text-gray-400 mb-6 min-w-[280px] text-left">
              Shop from unique stores and collect NFTs with every purchase
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Browse thousands of products</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Earn collectible NFTs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Secure blockchain payments</span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveProfile("seller")}
          className={`group 
            p-6 
            rounded-2xl 
            bg-[#0c0b1d]  
            shadow-[0_0_15px_-3px_rgba(127,79,210,0.2),0_8px_25px_-5px_rgba(127,79,210,0.3)] 
            hover:shadow-[0_0_15px_-3px_rgba(127,79,210,0.3),0_12px_30px_-5px_rgba(127,79,210,0.4)] 
            border border-purple-500/60 
            hover:border-purple-500 
            transition-all 
            duration-300 
            backdrop-blur-sm 
            relative overflow-hidden ${
            activeProfile === "seller" 
            ? 
            `opacity-100 
            border-purple-500 
            shadow-[0_0_15px_-3px_rgba(127,79,210,0.3),0_12px_30px_-5px_rgba(127,79,210,0.4)]` 
            : `opacity-70`
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 mb-4">
              <Store size={24} className="text-purple-400" />
            </div>

            <h3 className="text-xl text-left font-bold text-white mb-2">Seller</h3>
            <p className="text-sm text-gray-400 mb-6 min-w-[280px] text-left">
              Open your store and start selling to crypto-savvy customers
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Create your own store</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Manage products & orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-purple-400" />
                <span className="text-sm text-gray-300">Milestone NFT rewards</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}



