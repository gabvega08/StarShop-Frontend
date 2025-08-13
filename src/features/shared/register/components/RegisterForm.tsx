'use client';

import { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { REGISTRATION_CONSTANTS } from '../constants';
import Image from 'next/image';

interface RegisterFormProps {
  userType: 'buyer' | 'seller';
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ userType }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleRegistration } = useRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simular un pequeño delay para mostrar el loading
    setTimeout(() => {
      setIsLoading(false);
      handleRegistration(fullName.trim(), email.trim(), userType);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-starshopBackground">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <Image
              src="/starshop-logos/StarShop-Logo-Landing.svg"
              alt="StarShop Logo"
              width={48}
              height={48}
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-300 text-base">
            Join the next generation of digital commerce
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
              {userType === 'buyer' 
                ? REGISTRATION_CONSTANTS.FORM.BUYER.NAME_LABEL 
                : REGISTRATION_CONSTANTS.FORM.SELLER.NAME_LABEL
              }
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={userType === 'buyer' 
                ? REGISTRATION_CONSTANTS.FORM.BUYER.NAME_PLACEHOLDER 
                : REGISTRATION_CONSTANTS.FORM.SELLER.NAME_PLACEHOLDER
              }
              className="w-full px-4 py-3 bg-sidebar text-white border border-sidebarBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebarActive focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={REGISTRATION_CONSTANTS.FORM.EMAIL_PLACEHOLDER}
              className="w-full px-4 py-3 bg-sidebar text-white border border-sidebarBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebarActive focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !fullName.trim() || !email.trim()}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
              ${
                isLoading || !fullName.trim() || !email.trim()
                  ? 'bg-sidebarBorder text-sidebarText cursor-not-allowed'
                  : 'bg-sidebarActive hover:bg-sidebarActive/80 text-white shadow-lg shadow-sidebarActive/25'
              }
            `}
          >
            {isLoading ? REGISTRATION_CONSTANTS.FORM.LOADING_TEXT : REGISTRATION_CONSTANTS.FORM.SUBMIT_BUTTON_TEXT}
          </button>
        </form>
      </div>
    </div>
  );
}; 