"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { SellerSidebar } from "@/shared/components/sidebars/seller-sidebar"
import { BuyerSidebar } from "@/shared/components/sidebars/buyer-sidebar"
import { useUserType } from "@/shared/components/hooks/useUserType"
import { Separator } from "@/shared/components/ui/separator"

interface ConditionalSidebarLayoutProps {
  children: React.ReactNode
}

export function ConditionalSidebarLayout({ children }: ConditionalSidebarLayoutProps) {
  const pathname = usePathname()
  const userType = useUserType()

  if (!userType) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      {userType === "seller" && <SellerSidebar currentPath={pathname} />}
      {userType === "buyer" && <BuyerSidebar currentPath={pathname} />}

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <span className="font-semibold capitalize">{userType} Dashboard</span>
          </div>
        </header>

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
