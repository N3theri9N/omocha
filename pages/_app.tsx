import "../styles/globals.css";
import Header from "../src/component/layout/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header /> 
      <Component {...pageProps} />
    </>
  );
}
