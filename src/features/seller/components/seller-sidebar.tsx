"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  User,
  CreditCard,
  Home,
  BarChart3,
  Package,
  DollarSign,
  FileText,
  MessageCircle,
  HelpCircle,
  Settings,
} from "lucide-react"

const navigation = [
  { name: "Profile", href: "/store/profile", icon: User },
  { name: "Dashboard", href: "/store/dashboard", icon: Home },
  { name: "Analytics", href: "/store/analytics", icon: BarChart3 },
  { name: "Products", href: "/store/products", icon: Package },
  { name: "Transactions", href: "/store/transactions", icon: CreditCard },
  { name: "Invoices", href: "/store/invoices", icon: FileText },
  { name: "Billing", href: "/store/billing", icon: DollarSign },
  { name: "Chat", href: "/store/chat", icon: MessageCircle },
  { name: "Support Tickets", href: "/store/tickets", icon: HelpCircle },
  { name: "FAQ", href: "/store/faq", icon: HelpCircle },
]

const bottomItems = [
  { name: "Settings", href: "/store/settings", icon: Settings },
  { name: "Help", href: "/store/help", icon: HelpCircle },
]

const sections = [
  { title: "OVERVIEW", items: navigation.slice(0, 4) },
  { title: "FINANCE", items: navigation.slice(4, 7) },
  { title: "SUPPORT", items: navigation.slice(7, 10) },
]

export function SellerSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 h-screen flex flex-col text-white bg-starshopBackground"
      style={{ backgroundColor: "#0C0B1D" }}
    >
      <div className="flex-1 p-6">

        <div className="mb-8 flex justify-center">
          <Image src="/starshop-logos/StarShop-Logo-Landing.svg" alt="StarShop Logo" width={100} height={100} />
        </div>

        <nav className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800"
                      style={{
                        backgroundColor: isActive ? "#7E22CE" : "transparent",
                        color: isActive ? "#FFFFFF" : "#9CA3AF",
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-700">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800"
                style={{
                  backgroundColor: isActive ? "#7E22CE" : "transparent",
                  color: isActive ? "#FFFFFF" : "#9CA3AF",
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
