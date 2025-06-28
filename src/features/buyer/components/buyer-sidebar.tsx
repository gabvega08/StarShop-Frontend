'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  CreditCard,
  ShoppingBag,
  Calendar,
  Heart,
  Diamond,
  MessageCircle,
  FileText,
  Search
} from 'lucide-react';

const navigation = [
  { name: 'Profile', href: '/buyer/profile', icon: User },
  { name: 'Billing', href: '/buyer/billing', icon: CreditCard },
  { name: 'Orderss', href: '/buyer/orders', icon: ShoppingBag, badge: 3 },
  { name: 'Calendar', href: '/buyer/calendar', icon: Calendar },
  { name: 'Wishlist', href: '/buyer/wishlist', icon: Heart },
  { name: 'NFTs', href: '/buyer/nfts', icon: Diamond },
  { name: 'Messages', href: '/buyer/messages', icon: MessageCircle, badge: 5 },
  { name: 'Invoices', href: '/buyer/invoices', icon: FileText },
];

const sections = [
  { title: 'ACCOUNT', items: navigation.slice(0, 2) },
  { title: 'SHOPPING', items: navigation.slice(2, 6) },
  { title: 'COMMUNICATION', items: navigation.slice(6, 8) },
];

export function BuyerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed w-64 h-screen p-6 bg-sidebar border-r border-sidebarBorder z-50">
      <div className="mb-8 flex justify-center">
        <Image
          src="/starshop-logos/StarShop-Logo-Landing.svg"
          alt="StarShop Logo"
          width={100}
          height={100}
        />
      </div>

      <nav className="space-y-6">
        {sections.map(section => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-sidebarTitle uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebarActive/80 ${isActive ? 'bg-sidebarActive text-white' : 'text-sidebarText'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
