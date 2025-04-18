import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Header} from "@/components/header";
import {Poppins} from "next/font/google";

const oswald = Poppins({
    weight: "400",
    subsets: ["latin"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={oswald.className}>
        <Header></Header>
        <Component {...pageProps} />
      </div>
  );
}
