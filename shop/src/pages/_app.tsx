import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const ComponentWithLayout = Component as any;
    const ComponentLayout = ComponentWithLayout.Layout || Layout;
    return (
        <SessionProvider session={session}>
            <ComponentLayout>
                <Component {...pageProps} />
            </ComponentLayout>
        </SessionProvider>
    );
};
export default App;
