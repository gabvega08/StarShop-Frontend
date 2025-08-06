'use client';

import React from 'react';
import { UserProfile } from '../types/register';
import { REGISTRATION_CONSTANTS } from '../constants/register';

interface RegisterFormProps {
  userType: UserProfile;
  formData: {
    name: string;
    email: string;
  };
  onUpdateFormData: (field: 'name' | 'email', value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  userType,
  formData,
  onUpdateFormData,
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img
              src="/starshop-logos/StarShop-Logo-Landing.svg"
              alt="StarShop Logo"
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-300 text-base">
            Join the next generation of digital commerce
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-white text-sm font-medium mb-2"
            >
              {userType === 'buyer'
                ? REGISTRATION_CONSTANTS.FORM.BUYER.NAME_LABEL
                : REGISTRATION_CONSTANTS.FORM.SELLER.NAME_LABEL}
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.name}
              onChange={e => onUpdateFormData('name', e.target.value)}
              placeholder={
                userType === 'buyer'
                  ? REGISTRATION_CONSTANTS.FORM.BUYER.NAME_PLACEHOLDER
                  : REGISTRATION_CONSTANTS.FORM.SELLER.NAME_PLACEHOLDER
              }
              className="w-full px-4 py-3 bg-sidebar text-white border border-sidebarBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebarActive focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={e => onUpdateFormData('email', e.target.value)}
              placeholder={REGISTRATION_CONSTANTS.FORM.EMAIL_PLACEHOLDER}
              className="w-full px-4 py-3 bg-sidebar text-white border border-sidebarBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebarActive focus:border-transparent placeholder-gray-400"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}; 