import FiltersSidePanel, { OnApplyParams } from "@/components/search/FilterSidePanel";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import BookApiService from "@/core/services/bookApiService";
import { PaginationDto } from "@/core/types/server-dto/paginationDto";
import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import ProductCard from "@/components/products/ProductCard";
import { SfButton, SfIconChevronLeft, SfIconChevronRight, usePagination } from "@storefront-ui/react";
import classNames from "classnames";
import Pagination from "@/components/Pagination";
interface Props {
    searchResult: PaginationDto<BookPreviewDto>;
}

export default function SearchPage({ searchResult }: Props) {
    const { push } = useRouter();
    const handleApplyFilters = (params: OnApplyParams) => {
        push(
            {
                pathname: "/search",
                query: {
                    ...params,
                },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <div className="flex mt-10 flex-col gap-x-10 lg:flex-row">
            <FiltersSidePanel onApply={handleApplyFilters} />
            <div className="grow">
                <h2 className="typography-headline-3 mb-5 font-semibold text-neutral-900">Kết quả tìm kiếm</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 justify-around md:gap-5 gap-1 gap-y-7">
                    {searchResult.items.map((book) => (
                        <ProductCard key={book.id} product={book} />
                    ))}
                </div>
                <Pagination {...searchResult} />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        keyword,
        categoryIds,
        authorIds,
        publisherIds,
        minPrice,
        maxPrice,
        providerIds,
        sortBy,
        isAsc,
        page,
        limit,
    } = context.query;
    const searchResult = await BookApiService.advancedSearch(
        {
            authorIds,
            categoryIds,
            isAsc,
            keyword,
            maxPrice,
            minPrice,
            providerIds,
            publisherIds,
            sortBy,
        } as any,
        Number(page || 1),
        Number(limit || 24),
        {
            baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
        }
    );
    return {
        props: {
            searchResult,
        },
    };
};
