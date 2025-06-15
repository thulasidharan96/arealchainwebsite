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
  });

  // ✅ Redirect logged-in users away from /login
  if (token && path === "/login") {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(
      new URL(callbackUrl || "/dashboard", request.url)
    );
  }

  // ✅ Let public + API routes pass through
  if (isPublicPath || isAuthApiRoute || isApiRoute) {
    if (isVerifyOrResetPath && !hasForgetSession) {
      return NextResponse.redirect(new URL("/forgetpassword", request.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect private routes
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Matcher without locale-based routing
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
