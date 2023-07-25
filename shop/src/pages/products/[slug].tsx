import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import type { BookDto } from "@appTypes/server-dto/bookDto";
interface Props {
    book: BookDto;
}

export default function ProductPage({ book }: Props) {
    console.log(book);
    return <div></div>;
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
