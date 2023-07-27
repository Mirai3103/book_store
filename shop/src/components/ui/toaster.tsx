"use client";

import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { SfIconCheckCircle } from "@storefront-ui/react";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, ...props }) {
                return <Toast key={id} {...props} id={id} />;
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
