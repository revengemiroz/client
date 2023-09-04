"use client";
import React, { useEffect } from "react";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createSocketConnection, disconnectSocket } from "./socket";
import "@radix-ui/themes/styles.css";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function Providers({ children }) {
  // const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    createSocketConnection();

    // Cleanup the socket connection when the app unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Theme>{children}</Theme>
    </QueryClientProvider>
  );
}
