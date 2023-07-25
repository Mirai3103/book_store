import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import { toVietnameseCurrency } from "@/utils";
import {
    SfButton,
    SfRating,
    SfCounter,
    SfLink,
    SfIconShoppingCart,
    SfIconFavorite,
    SfTooltip,
} from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";

interface IProductCartProps {
    product: BookPreviewDto;
}

export default function ProductCard({ product }: IProductCartProps) {
    return (
        <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
            <div className="relative">
                <SfLink href="#" className="block">
                    <Image
                        src={product.thumbnailUrl}
                        alt="Great product"
                        className="object-cover h-auto rounded-md aspect-square"
                        width="300"
                        height="300"
                    />
                </SfLink>
                <SfButton
                    type="button"
                    variant="tertiary"
                    size="sm"
                    square
                    className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
                    aria-label="Add to wishlist"
                >
                    <SfIconFavorite size="sm" />
                </SfButton>
            </div>
            <div className="p-4 border-t border-neutral-200">
                <SfTooltip label={product.name} placement="bottom">
                    <SfLink href="#" variant="secondary" className="no-underline line-clamp-2">
                        {product.name}
                    </SfLink>
                </SfTooltip>
                <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                    {product.episode || product.author?.name}
                </p>
                <div className="flex items-center pt-1">
                    <SfRating size="xs" value={4.5} max={5} />
                    <SfLink
                        href={`/products/${product.slug}`}
                        as={Link}
                        variant="secondary"
                        className="pl-1 no-underline"
                    >
                        <SfCounter size="xs">{123}</SfCounter>
                    </SfLink>
                </div>

                <span className="block pb-2 font-bold typography-text-lg">{toVietnameseCurrency(product.price)}</span>
                <SfButton type="button" size="sm" slotPrefix={<SfIconShoppingCart size="sm" />}>
                    Thêm vào giỏ hàng
                </SfButton>
            </div>
        </div>
    );
}

export function ProductCardSimple({ product }: IProductCartProps) {
    return (
        <div className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]">
            <div className="relative">
                <SfLink href="#" className="block">
                    <Image
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"
                        width="150"
                        height="150"
                    />
                </SfLink>
                <SfButton
                    type="button"
                    variant="tertiary"
                    size="sm"
                    square
                    className="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
                    aria-label="Add to wishlist"
                >
                    <SfIconFavorite size="sm" />
                </SfButton>
            </div>
            <div className="p-2 border-t border-neutral-200 typography-text-sm">
                <SfTooltip label={product.name} placement="bottom">
                    <SfLink
                        as={Link}
                        href={`/products/${product.slug}`}
                        variant="secondary"
                        className="no-underline line-clamp-2 min-h-[calc(1.5rem*2)]"
                    >
                        {product.name}
                    </SfLink>
                </SfTooltip>
                <span className="block mt-2 font-bold">{toVietnameseCurrency(product.price)}</span>
            </div>
        </div>
    );
}
