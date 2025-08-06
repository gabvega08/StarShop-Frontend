'use client';

import React from 'react';
import Image from 'next/image';
import { User, Store } from 'lucide-react';
import { UserProfile } from '../types/register';
import { ProfileCard } from './ProfileCard';

interface ProfileSelectionProps {
  selectedProfile: UserProfile | null;
  onProfileSelect: (profile: UserProfile) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  selectedProfile,
  onProfileSelect,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg justify-center w-16 h-16 mb-4">
            <Image
              src="/starshop-logos/StarShop-Logo-Landing.svg"
              alt="StarShop Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Choose your profile
          </h1>
          <p className="text-gray-300 text-lg">
            Select how you want to use StarShop marketplace
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ProfileCard
            type="buyer"
            title="Buyer"
            description="Shop from unique stores and collect NFTs with every purchase."
            features={[
              'Browse thousands of products',
              'Earn collectible NFTs',
              'Secure blockchain payments',
            ]}
            icon={<User className="w-6 h-6 text-sidebarActive" />}
            isSelected={selectedProfile === 'buyer'}
            onSelect={() => onProfileSelect('buyer')}
          />

          <ProfileCard
            type="seller"
            title="Seller"
            description="Open your store and start selling to crypto-savvy customers."
            features={[
              'Create your own store',
              'Manage products & orders',
              'Milestone NFT rewards',
            ]}
            icon={<Store className="w-6 h-6 text-sidebarActive" />}
            isSelected={selectedProfile === 'seller'}
            onSelect={() => onProfileSelect('seller')}
          />
        </div>
      </div>
    </div>
  );
};
