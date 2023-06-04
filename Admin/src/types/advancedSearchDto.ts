export enum BookSortType {
    WeekBestSeller,
    MonthBestSeller,
    YearBestSeller,
    Newest,
    Oldest,
    PriceAsc,
    PriceDesc
}

export interface AdvancedSearchDto {
    keyword: string | null;
    categoryId: number | null;
    authorId: number | null;
    publisherId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    providerId: number | null;
    sort: BookSortType;
}