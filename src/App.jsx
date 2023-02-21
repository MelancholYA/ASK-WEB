import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";
import Auth from "./views/Auth";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <Auth />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export { App };
