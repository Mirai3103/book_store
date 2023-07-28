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
import { useToggle } from "usehooks-ts";

export enum SortBy {
    PRICE = "price",
    CREATED_AT = "createdAt",
    BESTSELLING = "BestSelling",
    HOT = "Hot",
    RATING = "Rating",
}

const sortOptions = [
    { by: SortBy.PRICE, asc: true, label: "Giá: Thấp đến Cao" },
    { by: SortBy.PRICE, asc: false, label: "Giá: Cao đến Thấp" },
    { by: SortBy.CREATED_AT, asc: false, label: "Mới nhất" },
    { by: SortBy.BESTSELLING, asc: true, label: "Bán chạy nhất" },
    { by: SortBy.CREATED_AT, asc: true, label: "Cũ nhất" },
    { by: SortBy.HOT, asc: true, label: "Nổi bật" },
    { by: SortBy.RATING, asc: true, label: "Đánh giá cao nhất" },
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
    defaultSortBy?: SortBy;
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
    defaultSortBy = SortBy.CREATED_AT,
    defaultIsAsc = false,
    defaultKeyword = "",
    onApply,
}: Props) {
    const [activeId, setActiveId] = useState<AccordionKey | null>(null);
    const handleToggle = (id: AccordionKey) => () => {
        setActiveId((prev) => (prev === id ? null : id));
    };
    const [sortBy, setSortBy] = useState<{
        by: SortBy;
        asc: boolean;
    }>({
        by: defaultSortBy,
        asc: defaultIsAsc,
    });
    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rawJson = e.target.value;
        const { by, asc } = JSON.parse(rawJson);
        console.log({ by, asc });
        setSortBy({ by, asc });
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
            sortBy: sortBy.by,
            isAsc: sortBy.asc,
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
    const [isShowFilter, toggleShowFilter] = useToggle(true);
    return (
        <aside className="  lg:max-w-[376px] mb-12 min-w-[270px] ">
            <div className="flex items-center justify-between mb-4">
                <h4 className="px-2 font-bold typography-headline-3">Tìm kiếm nâng cao</h4>
                <button
                    type="button"
                    className="lg:hidden text-neutral-500"
                    aria-label="Close filters panel"
                    onClick={toggleShowFilter}
                >
                    {isShowFilter ? <SfIconClose /> : <>Hiện bộ lọc</>}
                </button>
            </div>
            <div className={classNames("transition-all duration-300 ease-in-out", { hidden: !isShowFilter })}>
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
                    <SfSelect aria-label="Sorting" value={JSON.stringify(sortBy)} onChange={handleSortByChange}>
                        {sortOptions.map((option, index) => (
                            <option
                                key={index}
                                value={`${JSON.stringify({
                                    by: option.by,
                                    asc: option.asc,
                                })}`}
                            >
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
                                className="min-w-[40px]"
                                value={minValue}
                                onChange={(e) => setMinValue(+e.target.value)}
                                slotSuffix={<span className="text-neutral-500">đ</span>}
                            />
                            <span>Đến</span>
                            <SfInput
                                type="number"
                                placeholder="Đến"
                                className="min-w-[40px]"
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
            </div>
        </aside>
    );
}
