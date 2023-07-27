import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

import { cn } from "@/utils";
import { SfIconClose, SfIconError, SfIconWarning } from "@storefront-ui/react";

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
    return (
        <ToastPrimitives.Root ref={ref}>
            <AlertError id={"zz"} {...props} />
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
export function AlertError({ id, title, description, action }: ToasterToast) {
    return (
        <div
            id={id}
            role="alert"
            className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
        >
            <SfIconError size="lg" className="mt-2 mr-2 text-negative-700 shrink-0" />
            <div className="py-2 mr-2">
                <p className="font-medium typography-text-base md:typography-text-lg">{title}</p>
                <p>{description}</p>
            </div>
            {action && (
                <button
                    type="button"
                    className="py-1.5 px-3 md:py-2 md:px-4 rounded-md text-warning-700 hover:bg-warning-200 active:bg-warning-300 hover:text-warning-800 active:text-warning-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset"
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
