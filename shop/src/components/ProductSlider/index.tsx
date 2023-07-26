import {
    SfLink,
    SfButton,
    SfIconFavorite,
    SfIconChevronLeft,
    SfIconChevronRight,
    SfScrollable,
    SfTooltip,
    SfLoaderCircular,
} from "@storefront-ui/react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import type { BookPreviewDto } from "@appTypes/server-dto/bookPreviewDto";
import { toVietnameseCurrency } from "@/utils";
import { ProductCardSimple } from "../products/ProductCard";
import { ButtonNext, ButtonPrev } from "./SliderButton";
import React from "react";
import useIsOnScreen from "@/libs/hooks/useIsOnScreen";

interface IProduct {
    id: string;
    name: string;
    price: string;
    img: {
        src: string;
        alt: string;
    };
}
interface Props {
    moreHref?: string;
    products: BookPreviewDto[];
    fetchFn?: () => Promise<BookPreviewDto[]>;
    lazy?: boolean;
}
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

type ProductSliderProps = RequireAtLeastOne<Props, "fetchFn" | "products">;

export default function ProductSlider({ moreHref, products, fetchFn, lazy }: ProductSliderProps) {
    const [productsState, setProductsState] = React.useState<BookPreviewDto[] | undefined>(products);
    const [loading, setLoading] = React.useState(false);
    const { ref, isOnScreen } = useIsOnScreen<HTMLDivElement>();
    const isFetch = lazy ? isOnScreen : true;
    React.useEffect(() => {
        if (!productsState && isFetch) {
            setLoading(true);
            fetchFn?.()
                .then((res) => {
                    setProductsState(res);
                })
                .finally(() => setLoading(false));
        }
    }, [productsState, fetchFn, isFetch]);
    const { push } = useRouter();
    return (
        <div className="flex flex-col gap-y-2" ref={ref}>
            <SfScrollable
                className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                buttonsPlacement="block"
                drag
                slotPreviousButton={<ButtonPrev />}
                slotNextButton={<ButtonNext />}
            >
                {productsState &&
                    productsState.map((product) => <ProductCardSimple product={product} key={product.id} />)}
                {loading && (
                    <div className="flex w-full justify-center">
                        <SfLoaderCircular size="2xl" />
                    </div>
                )}
            </SfScrollable>
            {moreHref && (
                <SfButton className="m-auto" size="lg" variant="secondary" onClick={() => push(moreHref)}>
                    Xem thêm
                </SfButton>
            )}
        </div>
    );
}
