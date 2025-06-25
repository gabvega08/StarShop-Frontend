"use client"

import type React from "react"

import {
  BarChart3,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  Home,
  MessageCircle,
  Package,
  Settings,
  TicketIcon,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const overviewItems = [
  {
    title: "Profile",
    url: "/seller/profile",
    icon: User,
  },
  {
    title: "Dashboard",
    url: "/seller/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/seller/analytics",
    icon: BarChart3,
  },
  {
    title: "Products",
    url: "/seller/products",
    icon: Package,
  },
]

const financeItems = [
  {
    title: "Transactions",
    url: "/seller/transactions",
    icon: CreditCard,
  },
  {
    title: "Invoices",
    url: "/seller/invoices",
    icon: FileText,
  },
  {
    title: "Billing",
    url: "/seller/billing",
    icon: DollarSign,
  },
]

const supportItems = [
  {
    title: "Chat",
    url: "/seller/chat",
    icon: MessageCircle,
  },
  {
    title: "Support Tickets",
    url: "/seller/support-tickets",
    icon: TicketIcon,
  },
  {
    title: "FAQ",
    url: "/seller/faq",
    icon: HelpCircle,
  },
]

const footerItems = [
  {
    title: "Settings",
    url: "/seller/settings",
    icon: Settings,
  },
  {
    title: "Help",
    url: "/seller/help",
    icon: HelpCircle,
  },
]

interface SellerSidebarProps {
  currentPath?: string
}

export function SellerSidebar({ currentPath }: SellerSidebarProps) {
  const isActive = (url: string) => currentPath === url

  const getMenuButtonProps = (url: string) => ({
    style: {
      color: isActive(url) ? "#FFFFFF" : "#9CA3AF",
      backgroundColor: isActive(url) ? "#7E22CE" : "transparent",
    },
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive(url)) {
        e.currentTarget.style.backgroundColor = "rgba(126, 34, 206, 0.1)"
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive(url)) {
        e.currentTarget.style.backgroundColor = "transparent"
      }
    },
  })

  return (
    <Sidebar className="border-0" style={{ backgroundColor: "#0C0B1D" }}>
      <SidebarContent style={{ backgroundColor: "#0C0B1D" }}>
        <SidebarGroup>
          <SidebarGroupLabel
            className="font-semibold text-xs uppercase tracking-wider px-3 py-2"
            style={{ color: "#FFFFFF" }}
          >
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-colors duration-200 rounded-lg mx-2">
                    <a href={item.url} {...getMenuButtonProps(item.url)}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel
            className="font-semibold text-xs uppercase tracking-wider px-3 py-2"
            style={{ color: "#FFFFFF" }}
          >
            Finance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-colors duration-200 rounded-lg mx-2">
                    <a href={item.url} {...getMenuButtonProps(item.url)}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel
            className="font-semibold text-xs uppercase tracking-wider px-3 py-2"
            style={{ color: "#FFFFFF" }}
          >
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-colors duration-200 rounded-lg mx-2">
                    <a href={item.url} {...getMenuButtonProps(item.url)}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className="border-t mt-auto"
        style={{
          backgroundColor: "#0C0B1D",
          borderColor: "rgba(156, 163, 175, 0.2)",
        }}
      >
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="transition-colors duration-200 rounded-lg mx-2">
                <a href={item.url} {...getMenuButtonProps(item.url)}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
