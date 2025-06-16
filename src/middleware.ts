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

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true, // ✅ Helps identify parsing or header issues
  });

  console.log("✅ Middleware Log → Token:", token);
  console.log("✅ Middleware Log → Path:", path);

  // ✅ Redirect logged-in users away from /login
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Allow access to public + API routes
  if (isPublicPath || isAuthApiRoute || isApiRoute) {
    if (isVerifyOrResetPath && !hasForgetSession) {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
    return NextResponse.next();
  }

  // ✅ Block private routes for unauthenticated users
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ✅ Safe and Vercel-compatible matcher
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
