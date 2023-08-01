import { useId, useRef, useState, type KeyboardEvent } from "react";
import classNames from "classnames";
import {
    SfIconExpandMore,
    SfListItem,
    useDisclosure,
    useDropdown,
    SfIconCheck,
    useTrapFocus,
    InitialFocusType,
} from "@storefront-ui/react";

type SelectOption = {
    label: string;
    value: string;
};

interface Props {
    options: SelectOption[];
    selectedOption?: SelectOption;
    onChange: (option: SelectOption) => void;
    className?: string;
    defaultText?: string;
    placeholder?: string;
    label?: string;
    onFocus?: () => void;
    disabled?: boolean;
    error?: string;
}

export default function SelectDropdown({
    label,
    options,
    defaultText = "",
    placeholder,
    selectedOption,
    onChange,
    className = "",
    onFocus,
    disabled,
    error,
    ...rest
}: Props) {
    const { close, toggle, isOpen } = useDisclosure({ initialValue: false });
    const id = useId();
    const listboxId = useId();
    const selectTriggerRef = useRef<HTMLDivElement>(null);

    const { refs, style: dropdownStyle } = useDropdown({ isOpen, onClose: close });

    useTrapFocus(refs.floating, {
        arrowKeysUpDown: true,
        activeState: isOpen,
        initialFocus: InitialFocusType.autofocus,
        initialFocusContainerFallback: true,
    });

    const selectOption = (option: SelectOption) => {
        if (option.value == undefined) return;
        onChange?.(option);
        close();
        selectTriggerRef.current?.focus();
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === " ") toggle();
    };

    const handleOptionItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, option: SelectOption) => {
        if (event.key === " " || event.key === "Enter") selectOption(option);
    };

    return (
        <div>
            <label
                className={classNames("font-medium typography-label-sm", { "text-disabled-900": disabled })}
                htmlFor={id}
            >
                {label}
            </label>
            <div ref={refs.setReference} className="relative">
                <div
                    ref={selectTriggerRef}
                    id={id}
                    role="combobox"
                    aria-controls={listboxId}
                    aria-expanded={isOpen}
                    aria-disabled={disabled}
                    aria-label="Select one option"
                    aria-activedescendant={selectedOption ? `${listboxId}-${selectedOption.value}` : undefined}
                    className={classNames(
                        "mt-0.5 flex items-center gap-8 relative font-normal typography-text-base ring-inset rounded-md py-2 px-4 focus-visible:outline focus-visible:outline-offset ",
                        !error
                            ? disabled
                                ? "bg-disabled-100 ring-disabled-300 cursor-not-allowed"
                                : "ring-1 ring-neutral-300 hover:ring-primary-700 active:ring-primary-700 active:ring-2 focus:ring-primary-700 focus:ring-2 cursor-pointer"
                            : "ring-2 ring-negative-700"
                    )}
                    tabIndex={0}
                    onKeyDown={handleTriggerKeyDown}
                    onClick={() => !disabled && toggle()}
                    onFocus={onFocus}
                >
                    {selectedOption ? (
                        selectedOption.label
                    ) : (
                        <span className="text-neutral-500">{defaultText || placeholder || "Select an option"}</span>
                    )}
                    <SfIconExpandMore
                        className={classNames(
                            "ml-auto text-neutral-500 transition-transform ease-in-out duration-300",
                            {
                                "rotate-180": isOpen,
                            }
                        )}
                    />
                </div>
                <ul
                    id={listboxId}
                    ref={refs.setFloating}
                    role="listbox"
                    aria-label="Select one option"
                    className={classNames(
                        "w-full py-2 max-h-64 overflow-y-auto rounded-md shadow-md border border-neutral-100 bg-white z-10",
                        {
                            hidden: !isOpen,
                        }
                    )}
                    style={dropdownStyle}
                >
                    {options.map((option) => (
                        <SfListItem
                            id={`${listboxId}-${option.value}`}
                            key={`${listboxId}-${option.value}`}
                            role="option"
                            tabIndex={0}
                            aria-selected={option.value === selectedOption?.value}
                            className={classNames("block", { "font-medium": option.value === selectedOption?.value })}
                            onClick={() => selectOption(option)}
                            onKeyDown={(event) => handleOptionItemKeyDown(event, option)}
                            slotSuffix={
                                option.value === selectedOption?.value && <SfIconCheck className="text-primary-700" />
                            }
                        >
                            {option.label}
                        </SfListItem>
                    ))}
                </ul>
                {error && <p className="text-negative-700 typography-text-sm font-medium mt-0.5">{error}</p>}
            </div>
        </div>
    );
}
