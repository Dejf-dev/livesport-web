import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {Header} from "@/components/header";
import {Poppins} from "next/font/google";
import OfflineBanner from "@/components/offlineBanner";
import {useRouter} from "next/router";
import Head from "next/head";

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"]
})

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    const isErrorPage = ["/404", "/500"].includes(router.pathname);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className={poppins.className}>
                <Header isErrorPage={isErrorPage}/>
                <OfflineBanner/>
                <Component {...pageProps} />
            </div>
        </>
    );
}
