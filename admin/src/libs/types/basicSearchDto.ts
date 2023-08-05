export interface BasicSearchDto {
    keyword: string | null;
    categoryId: number | null;
    authorId: number | null;
    publisherId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    providerId: number | null;
    sortBy: string;
    isAsc: boolean;
    seriesId: number | null;
}