import BottomNavigation from "@/components/bottmNavigation";
import usePostStore from "@/store/postStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BottomNavigation />
    </>
  );
}
