import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthBootstrap } from "@/app/providers/auth/AuthBootstrap";
import { appRouter } from "@/app/providers/router/router";
import { queryClient } from "@/app/providers/query-client/queryClient";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};
