// import { signIn } from "next-auth/react";

// interface LoginCredentials {
//   email: string;
//   password: string;
//   // rememberMe?: boolean;
// }

// interface OtpVerification extends LoginCredentials {
//   verifyCode: string;
// }

// export async function handleLogin(credentials: LoginCredentials) {
//   try {
//     const result = await signIn("credentials", {
//       email: credentials.email,
//       password: credentials.password,
//       // rememberMe: credentials.rememberMe?.toString(),
//       step: "credentials",
//       redirect: false,
//     });

//     return {
//       success: !result?.error,
//       error: result?.error,
//     };
//   } catch (error) {
//     console.error("Login error:", error);
//     return {
//       success: false,
//       error: "Failed to process login request",
//     };
//   }
// }

// export async function handleOtpVerification(data: OtpVerification) {
//   try {
//     const result = await signIn("credentials", {
//       email: data.email,
//       password: data.password,
//       // rememberMe: data.rememberMe?.toString(),
//       verifyCode: data.verifyCode,
//       step: "otp",
//       redirect: false,
//     });

//     return {
//       success: !result?.error,
//       error: result?.error,
//     };
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     return {
//       success: false,
//       error: "Failed to verify OTP",
//     };
//   }
// }
