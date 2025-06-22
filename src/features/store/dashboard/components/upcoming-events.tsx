import { Calendar } from "lucide-react"
import { EventCard } from "./event-card"

export function UpcomingEvents() {
    
  const upcomingEvents = [
    {
      title: "Product Launch",
      date: "Nov 12",
      description: "New seasonal collection launch",
    },
    {
      title: "Customer Review",
      date: "Nov 14",
      description: "Quarterly review of customer feedback",
    },
    {
      title: "Inventory Check",
      date: "Nov 18",
      description: "Monthly inventory reconciliation",
    },
  ]

  return (
    <div className="p-6 rounded-lg border border-white/10 bg-[#0F0E1D] shadow-[0_0_8px_rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
        <Calendar className="w-5 h-5 text-purple-400" />
      </div>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <EventCard key={index} title={event.title} date={event.date} description={event.description} />
        ))}
        <button className="w-full mt-2 text-center text-sm text-purple-400 hover:text-purple-300">
          View all events →
        </button>
      </div>
    </div>
  )
}
