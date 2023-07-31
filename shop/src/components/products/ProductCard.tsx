import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";
import { clamp } from "@storefront-ui/shared";
import {
    SfButton,
    SfRating,
    SfCounter,
    SfLink,
    SfIconShoppingCart,
    SfIconFavorite,
    SfTooltip,
    SfIconSell,
    SfIconRemove,
    SfIconAdd,
    SfIconDelete,
} from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";

interface IProductCartProps extends React.HTMLAttributes<HTMLElement> {
    product: BookPreviewDto;
}

export default function ProductCard({ product, className = "" }: IProductCartProps) {
    return (
        <div className={mergeClassNames("border border-neutral-200 rounded-md hover:shadow-lg ", className)}>
            <div className="relative">
                <SfLink as={Link} href={`/products/${product.slug}`} className="block">
                    <Image
                        src={product.thumbnailUrl}
                        alt="Great product"
                        className="object-cover h-auto rounded-md aspect-square"
                        width="300"
                        height="300"
                        priority
                    />
                </SfLink>
            </div>
            <div className="p-4 border-t border-neutral-200">
                <SfTooltip label={product.name} placement="bottom" className="">
                    <SfLink
                        href={`/products/${product.slug}`}
                        variant="secondary"
                        className="no-underline line-clamp-2 min-h-[calc(2*1.5rem)] text-base"
                    >
                        {product.name}
                    </SfLink>
                </SfTooltip>
                <p className=" hidden md:block py-2 font-normal typography-text-sm text-neutral-700">
                    {product.author?.name}
                </p>
                <div className=" items-center hidden md:flex pt-1">
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
            </div>
            <div className="p-2 border-t border-neutral-200 typography-text-sm">
                <SfTooltip label={product.name} placement="bottom">
                    <SfLink
                        as={Link}
                        href={`/products/${product.slug}`}
                        variant="secondary"
                        className="no-underline line-clamp-2 min-h-[calc(1.25rem*2)]"
                    >
                        {product.name}
                    </SfLink>
                </SfTooltip>
                <span className="block mt-2 font-bold">{toVietnameseCurrency(product.price)}</span>
            </div>
        </div>
    );
}

export function ProductCardHorizontal({ product }: IProductCartProps) {
    return (
        <div className="relative flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
            <div className="relative overflow-hidden rounded-md w-[100px]">
                <SfLink href="#">
                    <Image
                        className="w-full h-auto border rounded-md border-neutral-200"
                        src={product.thumbnailUrl}
                        alt="alt"
                        width="200"
                        height="300"
                    />
                </SfLink>
                {/* <div className="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
                    <SfIconSell size="xs" className="mr-1" />
                    Sale
                </div> */}
            </div>
            <div className="flex flex-col pl-4 min-w-[180px] flex-1">
                <SfLink
                    href="#"
                    variant="secondary"
                    className="no-underline typography-text-sm sm:typography-text-base font-medium line-clamp-4"
                >
                    {product.name}
                </SfLink>

                <div className="items-center sm:mt-auto sm:flex">
                    <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                        {toVietnameseCurrency(product.price)}
                    </span>
                </div>
            </div>
        </div>
    );
}
