import "@/styles/globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return ( 
    <div>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="843490069277-tdpojoa7nvotk2adi4scm38q9bi05k7g.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster />
      </GoogleOAuthProvider  >
      <ReactQueryDevtools />
    </QueryClientProvider>
    </div>

  )
}
