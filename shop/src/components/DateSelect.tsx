import { SfSelect } from "@storefront-ui/react";
import React from "react";

interface Props {
    value: Date;
    onChange: (date: Date) => void;
}

export default function DateSelect({ value, onChange }: Props) {
    const [day, setDay] = React.useState<number>(value.getDate());
    const [month, setMonth] = React.useState<number>(value.getMonth());
    const [year, setYear] = React.useState<number>(value.getFullYear());
    const daysInMonth = React.useMemo(() => new Date(year, month + 1, 0).getDate(), [month, year]);
    const days = React.useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);
    const months = React.useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
    const years = React.useMemo(() => Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 10 - i), []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "day") {
            setDay(Number(value));
        } else if (name === "month") {
            setMonth(Number(value));
        } else if (name === "year") {
            setYear(Number(value));
        }
        onChange(new Date(year, month, day));
    };

    return (
        <div className="flex w-full gap-x-3">
            <SfSelect className=" min-w-[100px] " value={day} name="day" onChange={handleChange}>
                {days.map((dayt) => (
                    <option key={dayt} value={dayt}>
                        {dayt}
                    </option>
                ))}
            </SfSelect>
            <SfSelect className=" min-w-[100px] " value={month} name="month" onChange={handleChange}>
                {months.map((montht) => (
                    <option key={montht} value={montht}>
                        {montht}
                    </option>
                ))}
            </SfSelect>
            <SfSelect className="  min-w-[100px]" value={year} name="year" onChange={handleChange}>
                {years.map((yeart) => (
                    <option key={yeart} value={yeart}>
                        {yeart}
                    </option>
                ))}
            </SfSelect>
        </div>
    );
}
