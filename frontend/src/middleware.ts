import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of protected routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/onboarding",
    "/opportunities",
    "/business-brain",
    "/intelligence-center",
    "/leads",
    "/campaigns",
    "/inbox",
    "/analytics",
    "/notifications",
    "/settings"
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for auth token in cookies or headers (fallback to state cookie)
  const token = request.cookies.get("monitriach-auth-token")?.value;

  if (isProtectedRoute && !token) {
    // Redirect unauthenticated user to /login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/opportunities/:path*",
    "/business-brain/:path*",
    "/intelligence-center/:path*",
    "/leads/:path*",
    "/campaigns/:path*",
    "/inbox/:path*",
    "/analytics/:path*",
    "/notifications/:path*",
    "/settings/:path*"
  ]
};
