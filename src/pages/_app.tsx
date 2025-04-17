import Head from "next/head";
import type { AppProps } from "next/app";
import React from "react";
import BottomNavigation from "@/components/bottmNavigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1T7LHXR6NX"
        ></script>
        {React.createElement("script", {
          dangerouslySetInnerHTML: {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1T7LHXR6NX');
            `,
          },
        })}
      </Head>
      <Component {...pageProps} />
      <BottomNavigation />
    </>
  );
}
