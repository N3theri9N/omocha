import "../styles/globals.css";
// import Header from "../src/component/layout/Header";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <Header /> */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
