import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function toVietnameseCurrency(number: number) {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mergeClassNames(...classNames: string[]) {
    return twMerge(...classNames);
}
export function camelCaseToPascalCase(str: string | null | undefined) {
    if (!str) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export class QueryParamsBuilder {
    private params: string[] = [];

    public addParam(key: string, value: string | null | number | undefined): QueryParamsBuilder {
        if (value) {
            this.params.push(`${key}=${value}`);
        }
        return this;
    }
    public addParams(key: string, value: string[] | null | number[] | undefined): QueryParamsBuilder {
        if (!value) {
            return this;
        }
        if (!Array.isArray(value)) {
            value = [value as any];
        }
        if (value) {
            value.forEach((v) => {
                this.params.push(`${key}=${v}`);
            });
        }
        return this;
    }
    public build(): string {
        return this.params.join("&");
    }
}
