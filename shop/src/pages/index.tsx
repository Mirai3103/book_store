import ProductSlider from "@/components/ProductSlider";
import Hero, { IBannerItem } from "@/components/home/Hero";
import { SortBy } from "@/components/search/FilterSidePanel";
import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import { PaginationDto } from "@/core/types/server-dto/paginationDto";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
interface Props {
    adBanners: IBannerItem[];
    relatedProducts: PaginationDto<BookPreviewDto>;
    hotProducts: PaginationDto<BookPreviewDto>;
}

export default function Home({ adBanners, relatedProducts, hotProducts }: Props) {
    console.log(axios.defaults.baseURL);
    return (
        <>
            <Head>
                <title>{`Mua sách online chất lượng | Hữu Hoàng's Bookstore`}</title>
                <meta
                    name="description"
                    content="Chào mừng bạn đến với cửa hàng sách chúng tôi. Chúng tôi cung cấp các loại sách chất lượng với nhiều chủ đề khác nhau. Hãy khám phá ngay!"
                />
                <meta
                    name="keywords"
                    content="sách, mua sách online, sách chất lượng, sách văn học, sách học tập, manga, light novels, tiểu thuyết"
                />
            </Head>
            <div className="flex flex-col gap-y-12">
                <Hero adBanners={adBanners} />
                <span className="text-4xl text-secondary-400 font-bold text-center">SÁCH MỚI</span>
                <ProductSlider
                    moreHref={`/search?sortBy=${SortBy.CREATED_AT}&isAsc=false`}
                    products={relatedProducts.items}
                />
                <span className="text-4xl text-secondary-400 font-bold text-center">SÁCH BÁN CHẠY</span>
                <ProductSlider moreHref="f" products={hotProducts.items} />
                <div className="mt-28"></div>
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const adBanners = [
        {
            href: "/banner1",
            image: "https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img1.jpg",
        },
        {
            href: "/banner2",
            image: "https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img1.jpg?v=202",
        },
        {
            href: "/banner3",
            image: "https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img4.jpg?v=207",
        },
    ];
    //await BookApiService.getAllBooks({
    //     sortBy: "CreatedAt",
    //     isAsc: false,

    // },1,10)
    const relatedProducts = await axios.get(
        `${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Book/search?sortBy=CreatedAt&isAsc=false&page=1&limit=10`
    );
    const hotProducts = await axios.get(
        `${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Book/search?sortBy=Id&isAsc=true&page=1&limit=10`
    );

    return {
        props: {
            adBanners,
            relatedProducts: relatedProducts.data,
            hotProducts: hotProducts.data,
        },
    };
}
