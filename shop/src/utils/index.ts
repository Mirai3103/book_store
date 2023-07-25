import { twMerge } from "tailwind-merge";

export function toVietnameseCurrency(number: number) {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

export function mergeClassNames(...classNames: string[]) {
    return twMerge(...classNames);
}
