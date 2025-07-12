import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookies = request.cookies;
  const hasForgetSession = cookies.has("forgetSession");

  const publicPaths = [
    "/",
    "/login",
    "/areal-suite",
    "/signup",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/roadmap",
    "/company",
    "/vip-member",
    "/nft",
    "/ecosystem",
    "/forgetpassword",
    "/property",
    "/announcement",
    "/faqs",
    "/robots.txt",
    "/sitemap-0.xml",
  ];

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
  );

  const isVerifyOrResetPath = path === "/verify" || path === "/resetpassword";
  const isAuthApiRoute = path.startsWith("/api/auth/");
  const isApiRoute = path.startsWith("/api/");

  // 🔥 FIX: Use the correct cookie name that matches auth config
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName, // 🔥 This now matches the cookie name in auth config
  });

  // Only log in development
  if (process.env.NODE_ENV === "development") {
    console.log("✅ Middleware Log → Token exists:", !!token);
    console.log("✅ Middleware Log → Path:", path);
    console.log("✅ Middleware Log → Cookie Name:", cookieName);
  }

  // Redirect logged-in users away from /login
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow access to public + API routes
  if (isPublicPath || isAuthApiRoute || isApiRoute) {
    if (isVerifyOrResetPath && !hasForgetSession) {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
    return NextResponse.next();
  }

  // Block private routes for unauthenticated users
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /public/* (public files)
     * 5. /*.{png,jpg,jpeg,gif,webp,ico,svg} (image files)
     * 6. /favicon.ico, /sitemap.xml (public files)
     */
    "/((?!api/auth|_next|static|public|.*\\.(?:png|jpg|jpeg|gif|webp|ico|svg)$|favicon\\.ico|sitemap\\.xml).*)",
  ],
};
