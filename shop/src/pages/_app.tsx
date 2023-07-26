import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <SessionProvider session={session}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </SessionProvider>
);
export default App;
