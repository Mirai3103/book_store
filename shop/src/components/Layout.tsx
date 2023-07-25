import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <meta name="robots" content="index, follow" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="Vietnamese" />
                <meta name="revisit-after" content="7 days" />
                <meta name="author" content="Hữu Hoàng" />
            </Head>
            <Header />
            <main className="w-full container min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
