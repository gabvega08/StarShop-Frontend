import type { ReactNode } from "react"

interface CardContainerProps {
  title: string
  children: ReactNode
  className?: string
}

export default function CardContainer({ title, children, className = "" }: CardContainerProps) {
  return (
    <div
      className={`bg-transparent border border-zinc-700 rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.2)] p-6 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      {children}
    </div>
  )
}

