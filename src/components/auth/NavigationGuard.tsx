"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface NavigationGuardProps {
  children: React.ReactNode;
}

const publicPaths = ["/auth/login", "/", "/register"];

export default function NavigationGuard({ children }: NavigationGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user is not authenticated and trying to access a protected route
    if (
      !isAuthenticated &&
      !publicPaths.includes(pathname) &&
      !pathname.startsWith("/_next")
    ) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
