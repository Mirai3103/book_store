import React from "react";
import { useDebounce } from "usehooks-ts";

export default function useDebounceState<T>(initialState: T, delay: number = 1000) {
    const [value, setValue] = React.useState<T>(initialState);
    const debounceValue = useDebounce(value, delay);
    return {
        debounceValue,
        setValue,
        value,
    };
}
