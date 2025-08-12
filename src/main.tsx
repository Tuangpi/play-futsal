import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import "./i18n";
import LoadErrorScreen from "./components/ui/errors/LoadErrorScreen";
import LoadingSplashScreen from "./components/ui/errors/LoadingSplashScreen";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={LoadErrorScreen}>
        <Suspense fallback={<LoadingSplashScreen />}>
          <AuthProvider>
            <App />
            <ToastContainer position="bottom-right" />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
