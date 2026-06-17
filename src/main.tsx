import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

const clientId = import.meta.env.VITE_WORKOS_CLIENT_ID;

if (!clientId) {
  throw new Error("VITE_WORKOS_CLIENT_ID is required. Add it to .env.local");
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthKitProvider clientId={clientId}>
      <App />
    </AuthKitProvider>
  </ErrorBoundary>
)
