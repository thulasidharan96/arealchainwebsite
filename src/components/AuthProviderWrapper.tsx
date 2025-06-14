// components/AuthProviderWrapper.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_gzWkpMKtT",
  client_id: "1qqfmi8fvhptckbuuinkkehiu1",
  redirect_uri: "http://localhost:3000/dashboard",
  response_type: "code",
  scope: "phone openid email",
};

export default function AuthProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
