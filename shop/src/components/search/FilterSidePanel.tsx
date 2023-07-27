import {
    SfAccordionItem,
    SfButton,
    SfCounter,
    SfChip,
    SfIconClose,
    SfIconChevronLeft,
    SfIconArrowBack,
    SfIconCheck,
    SfListItem,
    SfThumbnail,
    SfRadio,
    SfRating,
    SfSelect,
    SfCheckbox,
    SfInput,
    SfIconSearch,
} from "@storefront-ui/react";
import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import classNames from "classnames";
import LazySelect, { useLazySelectState } from "./LazySelect";
import { CategoryDto } from "@/core/types/server-dto/categoryDto";
import CategoryApiService from "@/core/services/categoryApiService";
import useRangeValue from "@/libs/hooks/useRangeValue";
import AuthorApiService from "@/core/services/authorApiService";
import PublisherApiService from "@/core/services/publisherApiService";
import ProviderApiService from "@/core/services/providerApiService";
import { PublisherDto } from "@/core/types/server-dto/publisherDto";
import { useRouter } from "next/router";
import { AuthorDto } from "@/core/types/server-dto/authorDto";

const sortOptions = [
    { id: "sort1", label: "Relevance", value: "relevance" },
    { id: "sort2", label: "Price: Low to High", value: "price low to high" },
    { id: "sort3", label: "Price: High to Low", value: "price high to low" },
    { id: "sort4", label: "New Arrivals", value: "new arrivals" },
    { id: "sort5", label: "Customer Rating", value: "customer rating" },
    { id: "sort6", label: "Bestsellers", value: "bestsellers" },
];
export interface OnApplyParams {
    categoryIds?: string[];
    authorIds?: string[];
    publisherIds?: string[];
    providerIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    isAsc?: boolean;
    keyword?: string;
}

enum AccordionKey {
    CATEGORY = "category",
    PRICE = "price",
    AUTHOR = "author",
    PUBLISHER = "publisher",
    PROVIDER = "provider",
}

interface Props {
    defaultCategories?: CategoryDto[];
    defaultAuthors?: AuthorDto[];
    defaultPublishers?: PublisherDto[];
    defaultProviders?: PublisherDto[];
    defaultMinPrice?: number;
    defaultMaxPrice?: number;
    defaultSortBy?: string;
    defaultIsAsc?: boolean;
    defaultKeyword?: string;
    onApply?: (params: OnApplyParams) => void;
}

export default function FiltersSidePanel({
    defaultCategories = [],
    defaultAuthors = [],
    defaultPublishers = [],
    defaultProviders = [],
    defaultMinPrice = 0,
    defaultMaxPrice = 10000000,
    defaultSortBy = "relevance",
    defaultIsAsc = true,
    defaultKeyword = "",
    onApply,
}: Props) {
    const [activeId, setActiveId] = useState<AccordionKey | null>(null);
    const handleToggle = (id: AccordionKey) => () => {
        setActiveId((prev) => (prev === id ? null : id));
    };
    const keyWordInputRef = useRef<HTMLInputElement>(null);
    const {
        fetchFnStatic: fetchCategories,
        handleAdd: handleAddCategory,
        handleRemove: handleRemoveCategory,
        selectedItems: selectedCategories,
        handleClear: handleClearCategories,
    } = useLazySelectState({
        fetchFn: async (key) => {
            const res = await CategoryApiService.getAllCategories(1, 8, key);
            return res.items;
        },
        initialValue: defaultCategories,
    });
    const { maxValue, minValue, setMaxValue, setMinValue } = useRangeValue({
        max: 10000000,
        min: 0,
        defaultValue: {
            maxValue: defaultMaxPrice,
            minValue: defaultMinPrice,
        },
    });
    const {
        fetchFnStatic: fetchAuthors,
        handleAdd: handleAddAuthor,
        handleRemove: handleRemoveAuthor,
        selectedItems: selectedAuthors,
        handleClear: handleClearAuthors,
    } = useLazySelectState({
        fetchFn: async (key) => {
            const res = await AuthorApiService.getAllAuthors(1, 8, key);
            return res.items;
        },
        initialValue: defaultAuthors,
    });
    const {
        fetchFnStatic: fetchPublishers,
        handleAdd: handleAddPublisher,
        handleRemove: handleRemovePublisher,
        selectedItems: selectedPublishers,
        handleClear: handleClearPublishers,
    } = useLazySelectState({
        fetchFn: async (key) => {
            const res = await PublisherApiService.getAllPublishers(1, 8, key);
            return res.items;
        },
        initialValue: defaultPublishers,
    });
    const {
        fetchFnStatic: fetchProviders,
        handleAdd: handleAddProvider,
        handleRemove: handleRemoveProvider,
        selectedItems: selectedProviders,
        handleClear: handleClearProviders,
    } = useLazySelectState({
        fetchFn: async (key) => {
            const res = await ProviderApiService.getAllProviders(1, 8, key);
            return res.items;
        },
        initialValue: defaultProviders,
    });
    const { route } = useRouter();
    const handleApply = () => {
        const query: OnApplyParams = {
            categoryIds: selectedCategories.map((item) => item.id + ""),
            authorIds: selectedAuthors.map((item) => item.id + ""),
            publisherIds: selectedPublishers.map((item) => item.id + ""),
            providerIds: selectedProviders.map((item) => item.id + ""),
            minPrice: minValue,
            maxPrice: maxValue,
            keyword: keyWordInputRef.current?.value,
        };
        onApply?.(query);
    };
    const handleReset = () => {
        setMaxValue(defaultMaxPrice);
        setMinValue(defaultMinPrice);
        handleClearCategories();
        handleClearAuthors();
        handleClearPublishers();
        handleClearProviders();
        keyWordInputRef.current!.value = "";
        onApply?.({});
    };

    const listAccordions = [
        {
            name: "Danh mục",
            key: AccordionKey.CATEGORY,
            items: selectedCategories,
            fetchFn: fetchCategories,
            handleAdd: handleAddCategory,
            handleRemove: handleRemoveCategory,
        },
        {
            name: "Tác giả",
            key: AccordionKey.AUTHOR,
            items: selectedAuthors,
            fetchFn: fetchAuthors,
            handleAdd: handleAddAuthor,
            handleRemove: handleRemoveAuthor,
        },
        {
            name: "Nhà xuất bản",
            key: AccordionKey.PUBLISHER,
            items: selectedPublishers,
            fetchFn: fetchPublishers,
            handleAdd: handleAddPublisher,
            handleRemove: handleRemovePublisher,
        },
        {
            name: "Nhà cung cấp",
            key: AccordionKey.PROVIDER,
            items: selectedProviders,
            fetchFn: fetchProviders,
            handleAdd: handleAddProvider,
            handleRemove: handleRemoveProvider,
        },
    ];

    return (
        <aside className="  lg:max-w-[376px] mb-12 min-w-[270px] ">
            <div className="flex items-center justify-between mb-4">
                <h4 className="px-2 font-bold typography-headline-3">Tìm kiếm nâng cao</h4>
                <button type="button" className="sm:hidden text-neutral-500" aria-label="Close filters panel">
                    <SfIconClose />
                </button>
            </div>
            <h5 className="py-2 px-4 mb-6 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md">
                Từ khóa
            </h5>
            <div className="px-2">
                <label>
                    <SfInput slotPrefix={<SfIconSearch />} ref={keyWordInputRef} defaultValue={defaultKeyword} />
                </label>
            </div>
            <h5 className="py-2 px-4 mb-6  mt-6 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md">
                Sắp xếp
            </h5>
            <div className="px-2">
                <SfSelect aria-label="Sorting">
                    {sortOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SfSelect>
            </div>
            <h5 className="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md">
                Lọc
            </h5>
            <div className="flex flex-col gap-y-2">
                <SfAccordionItem
                    summary={
                        <div className="flex justify-between p-2 mb-2">
                            <p className="mb-2 font-semibold typography-headline-5">Khoảng giá</p>
                            <SfIconChevronLeft
                                className={classNames(
                                    "text-neutral-500",
                                    `${activeId === AccordionKey.PRICE ? "rotate-90" : "-rotate-90"}`
                                )}
                            />
                        </div>
                    }
                    open={activeId === AccordionKey.PRICE}
                    onToggle={handleToggle(AccordionKey.PRICE)}
                >
                    <div className="flex items-center gap-x-2">
                        <SfInput
                            type="number"
                            placeholder="Từ"
                            value={minValue}
                            onChange={(e) => setMinValue(+e.target.value)}
                            slotSuffix={<span className="text-neutral-500">đ</span>}
                        />
                        <span>Đến</span>
                        <SfInput
                            type="number"
                            placeholder="Đến"
                            value={maxValue}
                            onChange={(e) => setMaxValue(+e.target.value)}
                            slotSuffix={<span className="text-neutral-500">đ</span>}
                        />
                    </div>
                </SfAccordionItem>

                {listAccordions.map((item) => (
                    <SfAccordionItem
                        key={item.key}
                        summary={
                            <div className="flex justify-between p-2 mb-2">
                                <p className="mb-2 font-semibold typography-headline-5">{item.name}</p>
                                <SfIconChevronLeft
                                    className={classNames(
                                        "text-neutral-500",
                                        `${activeId === item.key ? "rotate-90" : "-rotate-90"}`
                                    )}
                                />
                            </div>
                        }
                        open={activeId === item.key}
                        onToggle={handleToggle(item.key)}
                    >
                        <LazySelect<any>
                            fetchFn={item.fetchFn}
                            getDisplayValue={(item) => item.name + ` (${item.totalBooks})`}
                            onAdd={item.handleAdd}
                            onRemove={item.handleRemove}
                            selectedItems={item.items}
                            placeholder={`Tìm kiếm ${item.name}`}
                        />
                    </SfAccordionItem>
                ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <SfButton variant="secondary" className="w-full mr-3" onClick={handleReset}>
                    Xoá lọc
                </SfButton>
                <SfButton className="w-full" onClick={handleApply}>
                    Áp dụng
                </SfButton>
            </div>
        </aside>
    );
}
