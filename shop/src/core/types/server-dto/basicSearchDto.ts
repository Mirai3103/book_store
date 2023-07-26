export interface BasicSearchDto {
    keyword?: string | undefined;
    categoryId?: number | undefined;
    authorId?: number | undefined;
    publisherId?: number | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    providerId?: number | undefined;
    sortBy: string;
    isAsc: boolean;
    seriesId?: number | undefined;
}
