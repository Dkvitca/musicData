import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css"; // Import the global CSS
import { PlaylistProvider } from "../contexts/PlaylistContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlaylistProvider>
      <Component {...pageProps} />
    </PlaylistProvider>
  );
}

export default MyApp;
