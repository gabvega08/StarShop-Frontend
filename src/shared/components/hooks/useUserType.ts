"use client"

import { usePathname } from "next/navigation"

export type UserType = "seller" | "buyer" | null

export function useUserType(): UserType {
  const pathname = usePathname()

  if (pathname.startsWith("/seller")) {
    return "seller"
  }

  if (pathname.startsWith("/buyer")) {
    return "buyer"
  }

  return null
}
