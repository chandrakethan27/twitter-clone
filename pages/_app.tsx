import "@/styles/globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <GoogleOAuthProvider clientId="843490069277-tdpojoa7nvotk2adi4scm38q9bi05k7g.apps.googleusercontent.com">
      <Component {...pageProps} />;
      <Toaster />
    </GoogleOAuthProvider>
  )
}
