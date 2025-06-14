"use client";

import { ReactNode } from "react";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_OIDC_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_OIDC_SCOPE,
};

export default function AuthProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
