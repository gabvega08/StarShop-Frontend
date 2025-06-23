import { cn } from "@/lib/utils"

// Status color mapping
export const statusColorMap = {
  Open: "bg-yellow-500/20 text-yellow-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  Resolved: "bg-green-500/20 text-green-400",
}

// Priority color mapping
export const priorityColorMap = {
  Low: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  High: "bg-red-500/20 text-red-400",
}

export const categoryColorMap = {
  Billing: "bg-purple-500/20 text-purple-400",
  Technical: "bg-blue-500/20 text-blue-400",
  Account: "bg-green-500/20 text-green-400",
}

// Helper function to get status color class
export const getStatusColor = (status: keyof typeof statusColorMap) => {
  return cn(
    "px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700/30",
    statusColorMap[status]
  )
}

// Helper function to get priority color class
export const getPriorityColor = (priority: keyof typeof priorityColorMap) => {
  return cn(
    "px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700/30",
    priorityColorMap[priority]
  )
}

// Helper function to get category color class
export const getCategoryColor = (category: keyof typeof categoryColorMap) => {
  return cn(
    "px-3 py-1 rounded-md text-xs font-medium",
    categoryColorMap[category]
  )
} 