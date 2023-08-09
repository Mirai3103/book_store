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
export function getDiffField<T extends object>({ oldValue, newValue }: { oldValue: T; newValue: T }): Partial<T> {
    const diff: Partial<T> = {};
    for (const key in newValue) {
        if (oldValue[key] !== newValue[key]) {
            diff[key] = newValue[key];
        }
    }
    return diff;
}
export function getServerImageURL(fileName: string | undefined | null): string {
    if (!fileName) {
        return "";
    }
    if (fileName.startsWith("http") || fileName.startsWith("blob")) {
        return fileName;
    }
    return `${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/File/${fileName}`;
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
