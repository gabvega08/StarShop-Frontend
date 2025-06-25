import type React from "react"
import { SellerSidebar } from "@/shared/components/sidebars/seller-sidebar"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-starshopBackground min-h-screen">
      <SellerSidebar />
      <main className="flex-1 bg-starshopBackground">{children}</main>
    </div>
  )
}
