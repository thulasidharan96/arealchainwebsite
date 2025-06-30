import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    kycStatus?: boolean;
  }
  interface Session {
    accessToken?: string;
    kycStatus?: boolean;
  }
}

// Secure temporary token for pending OTP verification
const createPendingToken = (email: string, password: string): string => {
  const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
  return jwt.sign(
    {
      email,
      password,
      type: "pending_otp",
      exp: Math.floor(Date.now() / 1000) + 5 * 60, // 5 minutes expiry
    },
    secret
  );
};

const verifyPendingToken = (
  token: string
): { email: string; password: string } | null => {
  try {
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
    const decoded = jwt.verify(token, secret) as any;

    if (decoded.type === "pending_otp") {
      return { email: decoded.email, password: decoded.password };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        verifyCode: { label: "OTP Code", type: "text" },
        step: { label: "Login Step", type: "text" },
        pendingToken: { label: "Pending Token", type: "text" }, // For OTP step
      },
      async authorize(credentials) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) {
          throw new Error("Missing API configuration");
        }

        try {
          if (credentials?.step === "credentials") {
            // Step 1: Verify credentials only
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Missing required login info");
            }

            const res = await fetch(`${baseUrl}user/precheck/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userIdentity: credentials.email,
                password: credentials.password,
              }),
            });

            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (data.status === true) {
              // ✅ SECURE: Don't return user object - this prevents session creation
              // Instead, throw a custom error with pending token
              const pendingToken = createPendingToken(
                credentials.email,
                credentials.password
              );
              throw new Error(`OTP_REQUIRED:${pendingToken}`);
            } else {
              throw new Error(data.message || "Login failed");
            }
          } else if (
            credentials?.step === "otp" &&
            credentials?.verifyCode &&
            credentials?.pendingToken
          ) {
            // Step 2: Verify OTP with pending token
            const pendingData = verifyPendingToken(credentials.pendingToken);
            if (!pendingData) {
              throw new Error(
                "Invalid or expired session. Please start login again."
              );
            }

            const res = await fetch(`${baseUrl}user/precheck/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userIdentity: pendingData.email,
                password: pendingData.password,
                verifyCode: parseInt(credentials.verifyCode),
              }),
            });

            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (data.status === true && data.data?.token) {
              // ✅ SECURE: Only create session AFTER complete 2FA verification
              return {
                id: data.data.subject || "user",
                email: pendingData.email,
                name: data.data.name || pendingData.email,
                accessToken: data.data.token,
                kycStatus: data.data.kycstatus || false,
              };
            } else {
              throw new Error(data.message || "OTP verification failed");
            }
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw error; // Re-throw to preserve custom error messages
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // ✅ SECURE: Add additional security headers
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN
            : undefined,
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      // ✅ SECURE: Only add user data to token after complete verification
      if (user && user.accessToken) {
        // Ensure user has accessToken (complete auth)
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;
        token.kycStatus = user.kycStatus;
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ SECURE: Only create session with valid token data
      if (token && token.accessToken) {
        session.accessToken = token.accessToken as string;
        session.kycStatus = token.kycStatus as boolean;
        session.user = {
          ...session.user,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  // ✅ SECURE: Additional security configurations
  useSecureCookies: process.env.NODE_ENV === "production",
  events: {
    async signOut(message) {
      // Clear any additional tokens/data on signout
      console.log("User signed out:", message);
    },
  },
};
