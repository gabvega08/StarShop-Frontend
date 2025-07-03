import React from 'react';

interface TabsProps {
  items: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    count?: number;
  }>;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function FAQTabs({ items, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 py-2 justify-center bg-tabBackground/70 w-fit mx-auto">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex items-center gap-2 px-2 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === item.id
              ? 'bg-purple-600 text-white'
              : 'text-gray-300 hover:bg-gray-900'
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
          {item.count !== undefined && (
            <span
              className={`ml-1 ${activeTab === item.id ? 'bg-[#9E47EE]/80' : 'bg-[#2B2934]'}  bg-opacity-30 px-3 py-1 rounded-full text-xs`}
            >
              {item.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
