import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import type { BookDto } from "@appTypes/server-dto/bookDto";
import ProductGallery, { DesktopGallery } from "@/components/ProductGallery";
import ProductBuyDetail from "@/components/ProductBuyDetail";
interface Props {
    book: BookDto;
}

export default function ProductPage({ book }: Props) {
    return (
        <div className="w-full h-full">
            <section className="w-full flex-col gap-x-12  lg:flex-row flex mt-8">
                <ProductGallery className="basis-5/12 mx-auto grow-0:" images={book.bookImages} />
                <ProductBuyDetail book={book} className="mx-auto " />
            </section>
        </div>
    );
}

// code below is for development mode

export const getServerSideProps: GetStaticProps = async (context) => {
    const { slug } = context.params as { slug: string };
    const res = await axios.get(`${process.env.ASP_NET_SERVER_URL}/Book/${slug}`);
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
