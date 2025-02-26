"use client";

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  User,
  LayoutDashboard,
  LineChart,
  ShoppingBag,
  Receipt,
  FileText,
  CreditCard,
  MessageSquare,
  Ticket,
  HelpCircle,
  Settings
} from 'lucide-react';

const Sidebar: FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-purple-600" : "hover:bg-gray-800";
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0b0c1b] text-white p-2 flex flex-col">
      <div className="flex-1">
        <div className="flex justify-center mb-2">
          <Image src="/starshop-logos/starshop-logo.svg" alt="StarShop Logo" width={60} height={60} className="mb-1" />
        </div>

        <div className="my-2 border-t border-gray-700/30 -mx-6"></div>
        
        <div className="mb-2">
          <h2 className="text-[12px] font-semibold mb-4">OVERVIEW</h2>
          <nav className="space-y-3">
            <Link href="/profile" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/profile')}`}>
              <User className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/profile' ? '' : 'text-white/60'}`}>Profile</span>
            </Link>
            <Link href="/dashboard" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/dashboard')}`}>
              <LayoutDashboard className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/dashboard' ? '' : 'text-white/60'}`}>Dashboard</span>
            </Link>
            <Link href="/analytics" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/analytics')}`}>
              <LineChart className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/analytics' ? '' : 'text-white/60'}`}>Analytics</span>
            </Link>
            <Link href="/products" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/products')}`}>
              <ShoppingBag className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/products' ? '' : 'text-white/60'}`}>Products</span>
            </Link>
          </nav>
        </div>

        <div className="mb-2">
          <h2 className="text-[12px] font-semibold mb-4">FINANCE</h2>
          <nav className="space-y-3">
            <Link href="/transactions" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/transactions')}`}>
              <Receipt className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/transactions' ? '' : 'text-white/60'}`}>Transactions</span>
            </Link>
            <Link href="/invoices" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/invoices')}`}>
              <FileText className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/invoices' ? '' : 'text-white/60'}`}>Invoices</span>
            </Link>
            <Link href="/billing" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/billing')}`}>
              <CreditCard className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/billing' ? '' : 'text-white/60'}`}>Billing</span>
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-[12px] font-semibold mb-2">SUPPORT</h2>
          <nav className="space-y-3">
            <Link href="/chat" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/chat')}`}>
              <MessageSquare className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/chat' ? '' : 'text-white/60'}`}>Chat</span>
            </Link>
            <Link href="/support-tickets" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/support-tickets')}`}>
              <Ticket className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/support-tickets' ? '' : 'text-white/60'}`}>Support Tickets</span>
            </Link>
            <Link href="/faq" className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/faq')}`}>
              <HelpCircle className="w-6 h-6" />
              <span className={`text-[12px] ${pathname === '/faq' ? '' : 'text-white/60'}`}>FAQ</span>
            </Link>
          </nav>
        </div>
      </div>

      <div>
        <div className="my-2 border-t border-gray-700/30 -mx-6"></div>

        <nav className="space-y-3">
          <Link href="/settings" className={`flex items-center space-x-3 p-1 rounded-lg ${isActive('/settings')}`}>
            <Settings className="w-6 h-6" />
            <span className={`text-[12px] ${pathname === '/settings' ? '' : 'text-white/60'}`}>Settings</span>
          </Link>
          <Link href="/help" className={`flex items-center space-x-3 p-1 rounded-lg ${isActive('/help')}`}>
            <HelpCircle className="w-6 h-6" />
            <span className={`text-[12px] ${pathname === '/help' ? '' : 'text-white/60'}`}>Help</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
