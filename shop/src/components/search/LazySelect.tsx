import useDebounceState from "@/libs/hooks/useDebounceState";
import { SfCheckbox, SfCounter, SfIconSearch, SfInput, SfListItem, SfLoaderCircular } from "@storefront-ui/react";
import classNames from "classnames";
import React from "react";
interface Props<T extends { id: string | number }> {
    fetchFn: (key: string) => Promise<T[]>;
    getDisplayValue?: (item: T) => string;
    onAdd?: (item: T) => void;
    onRemove?: (item: T) => void;
    selectedItems?: T[];
    placeholder?: string;
    className?: string;
}
export default function LazySelect<T extends { id: string | number }>({
    fetchFn,
    getDisplayValue,
    onAdd,
    onRemove,
    selectedItems,
    placeholder,
    className,
}: Props<T>) {
    const {
        value: searchValue,
        debounceValue: debouncedSearchValue,
        setValue: setSearchValue,
    } = useDebounceState("", 2000);
    const [searchedItems, setSearchedItems] = React.useState<T[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true);
        fetchFn(debouncedSearchValue || "")
            .then((items) => {
                setSearchedItems(items);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedSearchValue, fetchFn]);
    return (
        <div>
            <div className="mb-4 ">
                {selectedItems?.map((item) => (
                    <SfListItem
                        key={item.id}
                        as="label"
                        size="sm"
                        className={classNames("px-1.5 bg-transparent hover:bg-transparent")}
                        slotPrefix={
                            <SfCheckbox
                                className="flex items-center"
                                value={item.id}
                                onChange={(e) => {
                                    onRemove?.(item);
                                }}
                                defaultChecked
                            />
                        }
                    >
                        <p>
                            <span className="mr-2 text-sm">{getDisplayValue ? getDisplayValue(item) : item.id}</span>
                        </p>
                    </SfListItem>
                ))}
            </div>
            <label>
                <SfInput
                    slotPrefix={<SfIconSearch />}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    value={searchValue}
                />
            </label>
            <div className="mt-4  lg:max-w-[376px]">
                {isLoading && (
                    <div className="w-full flex justify-center py-6">
                        <SfLoaderCircular size="lg" />
                    </div>
                )}
                {!isLoading &&
                    searchedItems.map((item) =>
                        selectedItems?.find((selectedItem) => selectedItem.id === item.id) ? null : (
                            <SfListItem
                                key={item.id}
                                as="label"
                                size="sm"
                                className={classNames("px-1.5 bg-transparent hover:bg-transparent")}
                                slotPrefix={
                                    <SfCheckbox
                                        className="flex items-center"
                                        value={item.id}
                                        onChange={(e) => {
                                            onAdd?.(item);
                                        }}
                                    />
                                }
                            >
                                <span className="mr-2 text-sm line-clamp-2 w-full ">
                                    {getDisplayValue ? getDisplayValue(item) : item.id}
                                </span>
                            </SfListItem>
                        )
                    )}
            </div>
        </div>
    );
}
interface LazySelectStateProps<T extends { id: string | number }> {
    initialValue?: T[];
    fetchFn: (key: string) => Promise<T[]>;
}

export function useLazySelectState<T extends { id: string | number }>({
    initialValue = [],
    fetchFn,
}: LazySelectStateProps<T>) {
    const [selectedItems, setSelectedItems] = React.useState<T[]>(initialValue);
    const handleAdd = React.useCallback((item: T) => {
        setSelectedItems((prev) => [...prev, item]);
    }, []);
    const handleRemove = React.useCallback((item: T) => {
        setSelectedItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
    }, []);
    const fetchFnStatic = React.useMemo(() => fetchFn, []);
    const handleClear = React.useCallback(() => {
        setSelectedItems([]);
    }, []);
    return {
        selectedItems,
        handleAdd,
        handleRemove,
        fetchFnStatic,
        handleClear,
    };
}
