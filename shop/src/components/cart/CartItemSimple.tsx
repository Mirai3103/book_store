import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";
import { SfLink, SfTooltip } from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    cartItem: CartItemDto;
}
export default function CartItemSimple({ cartItem, className = "" }: Props) {
    return (
        <div
            className={mergeClassNames(
                "relative flex border-b-[1px] border-neutral-200 hover:shadow-md w-full p-4",
                className
            )}
        >
            <div className="relative overflow-hidden rounded-md w-[80px]">
                <SfLink as={Link} href={`/products/${cartItem.book.slug}`} className="block">
                    <Image
                        className="w-full h-auto aspect-[3/4] border rounded-md border-neutral-200"
                        src={cartItem.book.thumbnailUrl}
                        alt="alt"
                        width="200"
                        height="300"
                    />
                </SfLink>
            </div>
            <div className="flex flex-col pl-4 min-w-[180px] flex-1">
                <SfTooltip label={cartItem.book.name} placement="bottom">
                    <SfLink
                        href={`/products/${cartItem.book.slug}`}
                        variant="secondary"
                        className="no-underline line-clamp-2 typography-text-sm sm:typography-text-base font-medium "
                    >
                        {cartItem.book.name}
                    </SfLink>
                </SfTooltip>
                <div className="flex items-center mt-2">
                    <span className="font-bold mr-2 typography-text-sm sm:typography-text-lg">
                        {toVietnameseCurrency(cartItem.book.price)}
                    </span>
                </div>

                <div className="items-center mt-auto sm:flex">
                    <span className="font-bold ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                        {`X ${cartItem.quantity} = ${toVietnameseCurrency(cartItem.book.price * cartItem.quantity)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
