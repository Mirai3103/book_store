export interface AdvancedSearchDto {
  keyword?: string | null;
  categoryIds?: number[] | null;
  authorIds?: number[] | null;
  publisherIds?: number[] | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  providerIds?: number[] | null;
  sortBy: string;
  isAsc: boolean;
  seriesIds?: number[] | null;
}
