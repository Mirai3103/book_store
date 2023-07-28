import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useSsr } from "usehooks-ts";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "../ui/use-toast";
const NEXT_PUBLIC_ASP_NET_PROXY_URL = process.env.NEXT_PUBLIC_ASP_NET_PROXY_URL;
axios.defaults.baseURL = NEXT_PUBLIC_ASP_NET_PROXY_URL;
export default function Layout({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const handleNotify = (event: MessageEvent) => {
                const { type, title, description } = event.data;
                toast({
                    variant: type,
                    title: title,
                    description: description,
                });
            };
            window.addEventListener("notify" as any, handleNotify);
            return () => {
                window.removeEventListener("notify" as any, handleNotify);
            };
        }
    }, [toast]);
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
            <Toaster />
            <Footer />
        </>
    );
}
