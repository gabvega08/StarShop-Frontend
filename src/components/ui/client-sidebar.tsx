"use client";

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from './sidebar';

const sidebarRoutes = [
  '/profile',
  '/dashboard',
  '/analytics',
  '/products',
  '/transactions',
  '/invoices',
  '/billing',
  '/chat',
  '/supportTickets',
  '/faq',
  '/settings',
  '/help'
];

export default function ClientSidebar() {
  const pathname = usePathname();
  const shouldShowSidebar = sidebarRoutes.includes(pathname);
  const [isOpen, setIsOpen] = useState(false);
  
  if (!shouldShowSidebar) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`
        fixed lg:relative lg:sticky lg:top-0
        top-0 left-0 h-full
        w-64 shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-40 overflow-y-auto max-h-screen
      `}>
        <Sidebar />
      </div>
    </>
  );
} 