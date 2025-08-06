'use client';

import React from 'react';

interface ProfileCardProps {
  type: 'buyer' | 'seller';
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
  features,
  icon,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
        ${
          isSelected
            ? 'border-sidebarActive shadow-lg shadow-sidebarActive/20'
            : 'border-sidebarBorder hover:border-sidebarActive/50'
        }
      `}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-custom-light-card-background mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <p className="text-gray-300 mb-4">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-300">
            <div className="w-1.5 h-1.5 bg-sidebarActive rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
