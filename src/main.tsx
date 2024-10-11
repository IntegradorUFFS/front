import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import App from "./layout";
import "@/index.css";
import MaterialPage from "@/pages/Admin/Material";
import Radio from "@/components/Radio";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount: number, error: Record<string, any>) {
        if (error?.response) {
          const { status } = error.response;

          if (status === 404 || status === 401 || status === 400) {
            return false;
          }
        }
        return failureCount < 2;
      },
      retryDelay(failureCount) {
        return (failureCount + 1) * 500;
      },
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App>
          <MaterialPage />
          <Radio
            items={[
              { label: "op1", value: "op1" },
              { label: "op2", value: "op2" },
            ]}
            name="cauana"
            label="teste"
          />
        </App>
        <Toaster />
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);
