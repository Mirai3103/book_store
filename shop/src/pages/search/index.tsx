import FiltersSidePanel, { OnApplyParams } from "@/components/search/FilterSidePanel";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import BookApiService from "@/core/services/bookApiService";
import { PaginationDto } from "@/core/types/server-dto/paginationDto";
import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import ProductCard from "@/components/products/ProductCard";
import { SfButton, SfIconChevronLeft, SfIconChevronRight, SfLoaderCircular, usePagination } from "@storefront-ui/react";
import classNames from "classnames";
import Pagination from "@/components/Pagination";
import { AdvancedSearchDto } from "@/core/types/server-dto/advancedSearchDto";
import axios from "axios";
import { CategoryDto } from "@/core/types/server-dto/categoryDto";
import { AuthorDto } from "@/core/types/server-dto/authorDto";
import { PublisherDto } from "@/core/types/server-dto/publisherDto";
import { ProviderDto } from "@/core/types/server-dto/providerDto";
interface Props {
    searchResult: PaginationDto<BookPreviewDto>;
    defaultSelectedCategories: CategoryDto[];
    defaultSelectedAuthors: AuthorDto[];
    defaultSelectedPublishers: PublisherDto[];
    defaultSelectedProviders: ProviderDto[];
}

export default function SearchPage({
    searchResult: rawSearchResultRaw,
    defaultSelectedAuthors,
    defaultSelectedCategories,
    defaultSelectedProviders,
    defaultSelectedPublishers,
}: Props) {
    console.log({
        defaultSelectedAuthors,
        defaultSelectedCategories,
        defaultSelectedProviders,
        defaultSelectedPublishers,
    });
    const [searchResult, setSearchResult] = React.useState<PaginationDto<BookPreviewDto>>(rawSearchResultRaw);
    const { push, query, reload, replace } = useRouter();
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
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            reload();
        }, 50);
    };
    const [currentPage, setCurrentPage] = React.useState(searchResult.currentPage);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        if (currentPage === searchResult.currentPage) return;
        setIsLoading(true);
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
        } = query;
        const params: any = {
            keyword: keyword as string,
            categoryIds: categoryIds as string[],
            authorIds: authorIds as string[],
            publisherIds: publisherIds as string[],
            minPrice: minPrice as string,
            maxPrice: maxPrice as string,
            providerIds: providerIds as string[],
            sortBy: sortBy as string,
            isAsc: isAsc as string,
        };
        // scroll to top smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
        BookApiService.advancedSearch(params, currentPage, searchResult.pageSize)
            .then((res) => {
                setSearchResult(res);
                push({
                    pathname: "/search",
                    query: {
                        ...params,
                        page: currentPage,
                    },
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [query, currentPage, searchResult, push]);
    console.log("render", currentPage);
    return (
        <div className="flex mt-10 flex-col gap-x-10 lg:flex-row">
            <FiltersSidePanel
                onApply={handleApplyFilters}
                defaultAuthors={defaultSelectedAuthors ?? []}
                defaultCategories={defaultSelectedCategories ?? []}
                defaultPublishers={defaultSelectedPublishers ?? []}
                defaultProviders={defaultSelectedProviders ?? []}
                defaultIsAsc={query.isAsc === "true"}
                defaultKeyword={query.keyword as string}
                defaultMaxPrice={query.maxPrice && (Number(query.maxPrice) as any)}
                defaultMinPrice={query.minPrice && (Number(query.minPrice) as any)}
                defaultSortBy={query.sortBy as string}
            />
            <div className="grow">
                <h2 className="typography-headline-3 mb-5 font-semibold text-neutral-900">Kết quả tìm kiếm</h2>
                {isLoading && (
                    <div className="flex w-full justify-center my-4 py-10 items-center">
                        <SfLoaderCircular size="4xl" />
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 justify-around md:gap-5 gap-1 gap-y-7">
                    {!isLoading && searchResult.items.map((book) => <ProductCard key={book.id} product={book} />)}
                </div>
                <Pagination {...searchResult} onChange={setCurrentPage} />
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

    const [defaultSelectedCategories, defaultSelectedAuthors, defaultSelectedPublishers, defaultSelectedProviders] =
        await Promise.all([
            categoryIds
                ? axios.get<CategoryDto[]>(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Category/list`, {
                      params: {
                          ids: categoryIds,
                      },
                  })
                : null,
            authorIds
                ? axios.get<AuthorDto[]>(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Author/list`, {
                      params: {
                          ids: authorIds,
                      },
                  })
                : null,
            publisherIds
                ? axios.get<PublisherDto[]>(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Publisher/list`, {
                      params: {
                          ids: publisherIds,
                      },
                  })
                : null,
            providerIds
                ? axios.get<ProviderDto[]>(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Provider/list`, {
                      params: {
                          ids: providerIds,
                      },
                  })
                : null,
        ]);
    return {
        props: {
            searchResult,
            defaultSelectedCategories: defaultSelectedCategories?.data || null,
            defaultSelectedAuthors: defaultSelectedAuthors?.data || null,
            defaultSelectedPublishers: defaultSelectedPublishers?.data || null,
            defaultSelectedProviders: defaultSelectedProviders?.data || null,
        },
    };
};
