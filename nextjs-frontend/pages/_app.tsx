import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css"; // Import the global CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
