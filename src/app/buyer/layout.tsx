import type React from "react"
import { BuyerSidebar } from "@/shared/components/sidebars/buyer-sidebar"
export default function BuyerLayout({

    children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-starshopBackground min-h-screen">
      <BuyerSidebar />
      <main className="flex-1 bg-starshopBackground">{children}</main>
    </div>
  )
}
