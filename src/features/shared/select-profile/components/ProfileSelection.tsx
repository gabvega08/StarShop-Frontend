'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSetRole } from '@/shared/stores';
import { User, Store } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import Image from 'next/image';

export const ProfileSelection: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<
    'buyer' | 'seller' | null
  >(null);
  const setRole = useSetRole();
  const router = useRouter();

  const handleProfileSelect = (profile: 'buyer' | 'seller') => {
    setSelectedProfile(profile);
  };

  const handleContinue = () => {
    if (selectedProfile) {
      setRole(selectedProfile);
      if (selectedProfile === 'buyer') {
        router.push('/register/buyer');
      } else {
        router.push('/register/seller');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg justify-center w-16 h-16 mb-4">
            <Image
              src="/starshop-logos/StarShop-Logo-Landing.svg"
              alt="StarShop Logo"
              width={48}
              height={48}
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
            onSelect={() => handleProfileSelect('buyer')}
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
            onSelect={() => handleProfileSelect('seller')}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedProfile}
            className={`
              px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300
              ${
                selectedProfile
                  ? 'bg-sidebarActive hover:bg-sidebarActive/80 text-white shadow-lg shadow-sidebarActive/25'
                  : 'bg-sidebarBorder text-sidebarText cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
