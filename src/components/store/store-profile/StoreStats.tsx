interface StatItem {
    label: string
    value: string
  }
  
  export function StoreStats() {
    const stats: StatItem[] = [
      { label: "Total Products", value: "156" },
      { label: "Active Orders", value: "23" },
      { label: "Customer Rating", value: "4.8/5.0" },
    ]
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className="rounded-lg border border-white/50 bg-[#0F0E1D] p-6 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          >
            <div className="text-white/60 text-sm">{stat.label}</div>
            <div className="text-2xl font-bold mt-1">{stat.value}</div>
          </div>
        ))}
      </div>
    )
  }
  