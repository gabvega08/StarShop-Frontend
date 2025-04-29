import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string
  bgColor?: string
}

export function StatsCard({ icon, title, value, bgColor = "bg-[#1a1b1e]/30" }: StatsCardProps) {
  return (
    <div className={cn("rounded-lg p-4 border border-gray-800", bgColor)}>
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-sm font-medium text-gray-300">{title}</h3>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  )
}

export default StatsCard
