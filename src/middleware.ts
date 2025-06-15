import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = [
    "/",
    "/login",
    "/areal-suite",
    "/signup",
    "/about",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
    "/roadmap",
    "/company",
    "/vip-member",
    "/nft",
    "/ecosystem",
  ];

  // Check if the current path is public or API auth route
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
  );

  // Always allow NextAuth API routes
  const isAuthApiRoute = path.startsWith("/api/auth/");

  // Allow all API routes to pass through (you can restrict specific ones later)
  const isApiRoute = path.startsWith("/api/");

  // Skip middleware for public paths, auth API routes, and other API routes
  if (isPublicPath || isAuthApiRoute || isApiRoute) {
    return NextResponse.next();
  }

  try {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If accessing a protected route without a token, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // Add the current path as a callback URL
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // If accessing login page while authenticated, redirect to dashboard
    if (path === "/login" && token) {
      // Check if there's a callback URL to redirect to
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      const redirectUrl =
        callbackUrl && callbackUrl !== "/login"
          ? new URL(callbackUrl, request.url)
          : new URL("/dashboard", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to login for protected routes
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
