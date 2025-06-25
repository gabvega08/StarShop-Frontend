import { Package, ShoppingBag, Users, CreditCard } from "lucide-react"
import { StatsCard } from "./stats-card"

export function StatsGrid() {
  const statsCards = [
    {
      title: "Total Revenue",
      value: "4,320 XLM",
      change: "+12.5%",
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      trend: "up" as const,
    },
    {
      title: "Orders",
      value: "243",
      change: "+8.2%",
      icon: <Package className="w-6 h-6 text-blue-500" />,
      trend: "up" as const,
    },
    {
      title: "Products",
      value: "56",
      change: "+2",
      icon: <ShoppingBag className="w-6 h-6 text-green-500" />,
      trend: "up" as const,
    },
    {
      title: "Customers",
      value: "1,842",
      change: "+12.7%",
      icon: <Users className="w-6 h-6 text-amber-500" />,
      trend: "up" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          trend={card.trend}
        />
      ))}
    </div>
  )
}
