"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, CreditCard, ShoppingBag, Heart, Gem, MessageCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigation: NavSection[] = [
  {
    title: "ACCOUNT",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        title: "Billing",
        href: "/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "SHOPPING",
    items: [
      {
        title: "Orders",
        href: "/orders",
        icon: ShoppingBag,
      },
      {
        title: "Wishlist",
        href: "/wishlist",
        icon: Heart,
      },
      {
        title: "NFTs",
        href: "/nfts",
        icon: Gem,
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        title: "Messages",
        href: "/messages",
        icon: MessageCircle,
      },
      {
        title: "Invoices",
        href: "/invoices",
        icon: FileText,
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-[#0D0D1F] text-white p-4">
      <nav className="space-y-8">
        {navigation.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-xs font-semibold tracking-wider text-gray-400">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}


