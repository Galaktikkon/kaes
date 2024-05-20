// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "./configProvider";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ConfigProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}
