"use client"

import { useState } from "react"
import RevenueOverview from "./RevenueOverview"
import TrafficSources from "./TrafficSources"
import Tabs from "./Tabs"

export default function RevenueTrafficOverview() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="w-full">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueOverview />
        <TrafficSources />
      </div>
    </div>
  )
}

