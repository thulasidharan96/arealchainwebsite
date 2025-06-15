import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check cookie from request
  const cookies = request.cookies;
  const hasForgetSession = cookies.has("forgetSession");

  // Public paths that don't require auth
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
    "/forgetpassword",
  ];

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
  );

  const isVerifyOrResetPath = path === "/verify" || path === "/resetpassword";

  const isAuthApiRoute = path.startsWith("/api/auth/");
  const isApiRoute = path.startsWith("/api/");

  // Bypass for allowed routes
  if (isPublicPath || isAuthApiRoute || isApiRoute) {
    // Restrict verify/resetpassword if forgetSession not present
    if (isVerifyOrResetPath && !hasForgetSession) {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Get token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect unauthenticated users
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // Prevent logged-in user from accessing login again
    if (path === "/login" && token) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      const redirectUrl =
        callbackUrl && callbackUrl !== "/login"
          ? new URL(callbackUrl, request.url)
          : new URL("/dashboard", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Matcher without locale-based routing
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
