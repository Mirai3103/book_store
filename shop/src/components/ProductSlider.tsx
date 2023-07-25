import {
    SfLink,
    SfButton,
    SfIconFavorite,
    SfIconChevronLeft,
    SfIconChevronRight,
    SfScrollable,
    SfTooltip,
} from "@storefront-ui/react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import type { BookPreviewDto } from "@appTypes/server-dto/bookPreviewDto";
import { toVietnameseCurrency } from "@/utils";
import { ProductCardSimple } from "./ProductCard";
const defaultProducts = Array.from(Array(10), (_, i) => ({
    id: i.toString(),
    name: "Athletic mens walking sneakers",
    price: "$2,345.99",
    img: {
        src: "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png",
        alt: "White sneaker shoe",
    },
}));

function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames("absolute !rounded-full z-10 left-4 bg-white hidden md:block", {
                "!hidden": disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronLeft />
        </SfButton>
    );
}

ButtonPrev.defaultProps = { disabled: false };

function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames("absolute !rounded-full z-10 right-4 bg-white hidden md:block", {
                "!hidden": disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronRight />
        </SfButton>
    );
}

ButtonNext.defaultProps = { disabled: false };
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
}

export default function ProductSlider({ moreHref, products }: Props) {
    const { push } = useRouter();
    return (
        <div className="flex flex-col gap-y-2">
            <SfScrollable
                className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                buttonsPlacement="block"
                drag
                slotPreviousButton={<ButtonPrev />}
                slotNextButton={<ButtonNext />}
            >
                {products.map((product) => (
                    <ProductCardSimple product={product} key={product.id} />
                ))}
            </SfScrollable>
            {moreHref && (
                <SfButton className="m-auto" size="lg" variant="secondary" onClick={() => push(moreHref)}>
                    Xem thêm
                </SfButton>
            )}
        </div>
    );
}
