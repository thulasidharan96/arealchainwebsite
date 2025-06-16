import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        verifyCode: { label: "OTP Code", type: "text" },
        step: { label: "Login Step", type: "text" },
      },
      async authorize(credentials) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!credentials?.email || !credentials?.password || !baseUrl) {
          throw new Error("Missing required login info");
        }

        if (credentials.step === "credentials") {
          const res = await fetch(`${baseUrl}user/precheck/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userIdentity: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await res.json();
          if (data.status === true) {
            return {
              id: "pending_otp",
              email: credentials.email,
            };
          } else {
            throw new Error(data.message || "Login failed");
          }
        } else if (credentials.step === "otp" && credentials.verifyCode) {
          const res = await fetch(`${baseUrl}user/precheck/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userIdentity: credentials.email,
              password: credentials.password,
              verifyCode: parseInt(credentials.verifyCode),
            }),
          });
          const data = await res.json();
          if (data.status === true && data.data?.token) {
            return {
              id: data.data.subject || "user",
              email: credentials.email,
              accessToken: data.data.token,
              kycStatus: data.data.kycstatus || false,
            };
          } else {
            throw new Error(data.message || "OTP verification failed");
          }
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // ✅ Critical for Vercel
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;
        token.kycStatus = user.kycStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
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
};
