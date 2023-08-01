import SelectDropdown from "@/components/Select";
import AddressPicker from "@/components/address/AddressPicker";
import React from "react";
const options = [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
];
export default function TestPage() {
    return (
        <div className="mt-20">
            <AddressPicker onChangeAddress={console.log} />
        </div>
    );
}
