"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const QueryClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        // className: "font-mono",
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  );
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientContextProvider>
      {children}
      <ToastProvider />
    </QueryClientContextProvider>
  );
};
