"use client"

import type React from "react"

import { Calendar, CreditCard, Diamond, FileText, Heart, MessageCircle, ShoppingBag, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const accountItems = [
  {
    title: "Profile",
    url: "/buyer/profile",
    icon: User,
  },
  {
    title: "Billing",
    url: "/buyer/billing",
    icon: CreditCard,
  },
]

const shoppingItems = [
  {
    title: "Orders",
    url: "/buyer/orders",
    icon: ShoppingBag,
  },
  {
    title: "Calendar",
    url: "/buyer/calendar",
    icon: Calendar,
  },
  {
    title: "Wishlist",
    url: "/buyer/wishlist",
    icon: Heart,
  },
  {
    title: "NFTs",
    url: "/buyer/nfts",
    icon: Diamond,
  },
]

const communicationItems = [
  {
    title: "Messages",
    url: "/buyer/messages",
    icon: MessageCircle,
  },
  {
    title: "Invoices",
    url: "/buyer/invoices",
    icon: FileText,
  },
]

interface BuyerSidebarProps {
  currentPath?: string
}

export function BuyerSidebar({ currentPath }: BuyerSidebarProps) {
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
      <SidebarHeader
        className="border-b"
        style={{
          backgroundColor: "#0C0B1D",
          borderColor: "rgba(156, 163, 175, 0.2)",
        }}
      >
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg">
            <span className="text-2xl font-bold" style={{ color: "#0C0B1D" }}>
              S
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: "#0C0B1D" }}>
        <SidebarGroup>
          <SidebarGroupLabel
            className="font-semibold text-xs uppercase tracking-wider px-3 py-2"
            style={{ color: "#FFFFFF" }}
          >
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
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
            Shopping
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {shoppingItems.map((item) => (
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
            Communication
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communicationItems.map((item) => (
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
      <SidebarRail />
    </Sidebar>
  )
}
