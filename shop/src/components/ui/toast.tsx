import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

import { cn, mergeClassNames } from "@/utils";
import { SfIconCheck, SfIconClose, SfIconError, SfIconInfo, SfIconWarning } from "@storefront-ui/react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
            className
        )}
        {...props}
    />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
        variant?: "info" | "success" | "warning" | "error";
    }
>(({ className, variant = "info", ...props }, ref) => {
    const id = React.useId();
    return (
        <ToastPrimitives.Root ref={ref}>
            <Alert id={id} variant={variant} className={className} {...props} />
        </ToastPrimitives.Root>
    );
});
Toast.displayName = ToastPrimitives.Root.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export { type ToastProps, ToastProvider, ToastViewport, Toast };

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: () => void;
};

const AlertClassNameStyle: any = {
    info: {
        bg: "bg-primary-100 ring-primary-300",
        icon: <SfIconInfo size="lg" className="mt-2 mr-2 text-primary-700 shrink-0" />,
        text: "text-primary-700",
    },
    success: {
        bg: "bg-green-100 ring-green-300",
        icon: <SfIconCheck size="lg" className="mt-2 mr-2 text-green-700 shrink-0" />,
        text: "text-green-700",
    },
    warning: {
        bg: "bg-warning-100 ring-warning-300",
        icon: <SfIconWarning size="lg" className="mt-2 mr-2 text-warning-700 shrink-0" />,
        text: "text-warning-700",
    },
    error: {
        bg: "bg-negative-100 ring-negative-300",
        icon: <SfIconError size="lg" className="mt-2 mr-2 text-negative-700 shrink-0" />,
        text: "text-negative-700",
    },
};

export function Alert({ id, title, description, action, variant = "info", className = "" }: ToasterToast) {
    return (
        <div
            id={id}
            role="alert"
            className={mergeClassNames(
                "flex items-start md:items-center max-w-[600px] shadow-md pr-2 pl-4 ring-1 typography-text-sm md:typography-text-base py-1 rounded-md",
                AlertClassNameStyle[variant].bg,
                className
            )}
        >
            {AlertClassNameStyle[variant].icon}
            <div className="py-2 mr-2">
                <p className="font-medium typography-text-base md:typography-text-lg">{title}</p>
                <p>{description}</p>
            </div>
            {action && (
                <button
                    type="button"
                    className={mergeClassNames(
                        "py-1.5 px-3 md:py-2 md:px-4 rounded-md hover:bg-warning-200 active:bg-warning-300 hover:text-warning-800 active:text-warning-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset",
                        AlertClassNameStyle[variant].text
                    )}
                    onClick={action}
                ></button>
            )}
            <ToastPrimitives.Close className="ml-auto">
                <SfIconClose className="hidden md:block" />
                <SfIconClose size="sm" className="block md:hidden" />
            </ToastPrimitives.Close>
        </div>
    );
}
