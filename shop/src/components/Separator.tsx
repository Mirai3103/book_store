import { mergeClassNames } from "@/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    bgClassName?: string;
    hClassName?: string;
    textClassName?: string;
    text?: string;
}
// like   ------------------Hello------------------
export default function Separator({
    className,
    text,
    textClassName = "",
    bgClassName = "bg-primary-500",
    hClassName = "h-1",
    ...props
}: Props) {
    return (
        <div className={`flex items-center justify-center ${className}`} {...props}>
            <div className={`w-full ${bgClassName} ${hClassName}`}></div>
            {text && (
                <div
                    className={mergeClassNames(
                        "text-2xl font-semibold whitespace-nowrap text-primary-600 mx-4",
                        textClassName
                    )}
                >
                    {text}
                </div>
            )}
            <div className={`w-full ${bgClassName} ${hClassName}`}></div>
        </div>
    );
}
