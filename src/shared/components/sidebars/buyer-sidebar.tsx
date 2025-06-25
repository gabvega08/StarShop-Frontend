"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, CreditCard, ShoppingBag, Calendar, Heart, Diamond, MessageCircle, FileText } from "lucide-react"

const navigation = [
  { name: "Profile", href: "/buyer/profile", icon: User },
  { name: "Billing", href: "/buyer/billing", icon: CreditCard },
  { name: "Orders", href: "/buyer/orders", icon: ShoppingBag, badge: 3 },
  { name: "Calendar", href: "/buyer/calendar", icon: Calendar },
  { name: "Wishlist", href: "/buyer/wishlist", icon: Heart },
  { name: "NFTs", href: "/buyer/nfts", icon: Diamond },
  { name: "Messages", href: "/buyer/messages", icon: MessageCircle, badge: 5 },
  { name: "Invoices", href: "/buyer/invoices", icon: FileText },
]

const sections = [
  { title: "ACCOUNT", items: navigation.slice(0, 2) },
  { title: "SHOPPING", items: navigation.slice(2, 6) },
  { title: "COMMUNICATION", items: navigation.slice(6, 8) },
]

export function BuyerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen text-white p-6 bg-starshopBackground" style={{ backgroundColor: "#0C0B1D" }}>

      <div className="mb-8 flex justify-center">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <span className="text-slate-900 font-bold text-xl italic">S</span>
        </div>
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
    </aside>
  )
}
