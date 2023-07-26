import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useCallback } from "react";
import type { BookDto } from "@appTypes/server-dto/bookDto";
import ProductGallery, { DesktopGallery } from "@/components/products/ProductGallery";
import ProductBuyDetail from "@/components/products/ProductBuyDetail";
import Head from "next/head";
import ProductDetail from "@/components/products/ProductDetail";
import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import RelatedVertical from "@/components/products/RelatedBook";
import { PaginationDto } from "@/core/types/server-dto/paginationDto";
import Separator from "@/components/Separator";
import BookApiService from "@/core/services/bookApiService";
import ProductSlider from "@/components/ProductSlider";
interface Props {
    book: BookDto;
}

export default function ProductPage({ book }: Props) {
    const fetchSameAuthorFn = useCallback(async () => {
        return (
            await BookApiService.getAllBooks(
                {
                    authorId: book.author?.id,
                    sortBy: "CreatedAt",
                    isAsc: false,
                },
                1,
                4
            )
        ).items;
    }, [book.author?.id]);
    const fetchSameCategoryFn = useCallback(async () => {
        const data = await BookApiService.getAllBooks({
            isAsc: false,
            sortBy: "CreatedAt",
            categoryId: book.category?.id,
        });
        return data.items;
    }, [book.category?.id]);

    const fetchSameSeriesFn = useCallback(async () => {
        const data = await BookApiService.getAllBooks({
            isAsc: false,
            sortBy: "CreatedAt",
            seriesId: book.series?.id,
        });
        return data.items;
    }, [book.series?.id]);

    return (
        <div className="w-full h-full">
            <Head>
                <title>{book.title}</title>
                <meta name="description" content={book.description || ""} />
                <meta name="keywords" content={book.name + ", " + book.category?.name} />
            </Head>
            <section className="w-full flex-col gap-x-12  lg:flex-row flex mt-8">
                <ProductGallery className="basis-5/12 mx-auto grow-0:" images={book.bookImages} />
                <ProductBuyDetail book={book} className="mx-auto " />
            </section>
            <section className="mt-16 lg:flex-row flex-col flex gap-y-14 gap-x-20">
                <ProductDetail book={book} className="w-full grow" />
                <RelatedVertical
                    name="Cùng tác giả"
                    hrefMore={`/author/${book.author?.id}`}
                    className="w-full lg:w-1/3"
                    fetchFn={fetchSameAuthorFn}
                />
            </section>
            {book.series && (
                <section className="mt-16">
                    <Separator text="Sách cùng bộ"></Separator>
                    <ProductSlider moreHref="/series/[slug]" fetchFn={fetchSameSeriesFn} lazy />
                </section>
            )}
            <section className="mt-16">
                <Separator text="Sách cùng thể loại"></Separator>
                <ProductSlider moreHref="/category/[slug]" fetchFn={fetchSameCategoryFn} lazy />
            </section>
        </div>
    );
}

// code below is for development mode

export const getServerSideProps: GetStaticProps = async (context) => {
    const { slug } = context.params as { slug: string };
    const res = await axios.get<BookDto>(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Book/${slug}`);
    return {
        props: {
            book: res.data,
        },
    };
};

//code below is for production mode
// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await axios.get<string[]>(`${process.env.ASP_NET_SERVER_URL}/Book/slugs`);
//     return {
//         paths: res.data.map((slug) => ({ params: { slug } })),
//         fallback: true,
//     };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//     const { slug } = context.params as { slug: string };
//     const res = await axios.get(`${process.env.ASP_NET_SERVER_URL}/Book/${slug}`);
//     return {
//         props: {
//             book: res.data,
//         },
//     };
// };
