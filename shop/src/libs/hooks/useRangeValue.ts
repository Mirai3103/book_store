import React from "react";

interface IUseRangeValue {
    min: number;
    max: number;
    defaultValue?: {
        minValue: number;
        maxValue: number;
    };
}

export default function useRangeValue({ min, max, defaultValue }: IUseRangeValue) {
    const [{ minValue, maxValue }, setRangeValue] = React.useState({
        minValue: defaultValue?.minValue || min,
        maxValue: defaultValue?.maxValue || max,
    });
    const setMinValue = React.useCallback(
        (value: number) => {
            if (value >= min && value <= maxValue) {
                setRangeValue((prev) => {
                    if (value > prev.maxValue) {
                        return prev;
                    }
                    return {
                        ...prev,
                        minValue: value,
                    };
                });
            }
        },
        [min, maxValue]
    );
    const setMaxValue = React.useCallback(
        (value: number) => {
            if (value <= max && value >= minValue) {
                setRangeValue((prev) => {
                    if (value < prev.minValue) {
                        return prev;
                    }
                    return {
                        ...prev,
                        maxValue: value,
                    };
                });
            }
        },
        [max, minValue]
    );
    return {
        minValue,
        maxValue,
        setMinValue,
        setMaxValue,
    };
}
