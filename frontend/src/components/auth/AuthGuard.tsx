"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isOnboarded } = useAuthStore();

  useEffect(() => {
    // Public routes that do not require auth guard
    const isPublicRoute =
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password");

    const isOnboardingRoute = pathname.startsWith("/onboarding");

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    } else if (isAuthenticated && !isOnboarded && !isOnboardingRoute && !isPublicRoute) {
      router.push("/onboarding");
    }
  }, [isAuthenticated, isOnboarded, pathname, router]);

  return <>{children}</>;
}
