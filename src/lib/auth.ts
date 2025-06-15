import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the User type to include custom properties
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
        rememberMe: { label: "Remember Me", type: "checkbox" },
        verifyCode: { label: "OTP Code", type: "text" },
        step: { label: "Login Step", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) {
          throw new Error("API base URL not configured");
        }

        try {
          // Initial login step - send credentials to get OTP
          if (credentials.step === "credentials") {
            const response = await fetch(`${baseUrl}user/precheck/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userIdentity: credentials.email,
                password: credentials.password,
                ...(credentials.rememberMe && {
                  rememberMe: credentials.rememberMe === "true",
                }),
              }),
            });

            const data = await response.json();
            console.log("Credentials step response:", data);

            // Check for API success using the actual response structure
            if (data.status === true) {
              // Return temporary user object to indicate OTP was sent
              return {
                id: "pending_otp",
                email: credentials.email,
                name: undefined,
                accessToken: undefined,
              };
            } else {
              throw new Error(data.message || "Login failed");
            }
          }
          // OTP verification step
          else if (credentials.step === "otp" && credentials.verifyCode) {
            const response = await fetch(`${baseUrl}user/precheck/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userIdentity: credentials.email,
                password: credentials.password,
                verifyCode: parseInt(credentials.verifyCode),
              }),
            });

            const data = await response.json();
            console.log("OTP step response:", data);

            // Check for API success and token using the actual response structure
            if (data.status === true && data.data?.token) {
              return {
                id: data.data.subject || "user", // Use subject from token or fallback
                name: credentials.email, // Use email as name since API doesn't return user name
                email: credentials.email,
                accessToken: data.data.token,
                kycStatus: data.data.kycstatus || false,
              };
            } else {
              throw new Error(data.message || "OTP verification failed");
            }
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};
