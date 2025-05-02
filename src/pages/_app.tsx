import type { AppProps } from "next/app";
import React from "react";
import "@/styles/globals.css";
import { MyHeader } from "@/components/myHeader";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHeader />
      <Component {...pageProps} />
    </>
  );
}
