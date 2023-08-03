import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";
import { SfCheckbox, SfLink, SfTooltip } from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuantitySelector from "../QuantitySelector";
import { BsFillTrashFill } from "react-icons/bs";
import { useStore } from "zustand";
import useCartStore from "@/store/cartStore";
import useSessionStore from "@/store/sessionStore";
import { OrderItem } from "@/pages/user/cart";
import { useToast } from "../ui/use-toast";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    cartItem: OrderItem;
    handleToggleCheck?: () => void;
}
export default function CartItem({ cartItem, className = "", handleToggleCheck }: Props) {
    const setQuantityAsync = useStore(useCartStore, (state) => state.setQuantityAsync);
    const removeAsync = useStore(useCartStore, (state) => state.removeAsync);
    const accessToken = useStore(useSessionStore, (state) => state.session?.accessToken);
    const handleChangedQuantity = async (quantity: number) => {
        await setQuantityAsync(cartItem.bookId, quantity, accessToken || "");
    };
    const { toast } = useToast();
    const handleRemove = async () => {
        await removeAsync(cartItem.bookId, accessToken || "");
        toast({
            variant: "success",
            title: "Xóa sản phẩm thành công",
        });
    };
    return (
        <tr
            className={mergeClassNames(
                "relative flex gap-x-4 border-b-[1px] border-neutral-200 hover:shadow-md w-full p-4",
                className
            )}
        >
            <td className="flex items-center">
                <div className="px-4">
                    <SfCheckbox checked={cartItem.checked} onChange={handleToggleCheck} />
                </div>
            </td>
            <td className="relative overflow-hidden rounded-md w-[100px]">
                <SfLink as={Link} href={`/products/${cartItem.book.slug}`} className="block">
                    <Image
                        className="w-full h-auto aspect-[3/4] border rounded-md border-neutral-200"
                        src={cartItem.book.thumbnailUrl}
                        alt="alt"
                        width="200"
                        height="300"
                    />
                </SfLink>
            </td>
            <td className="flex flex-col justify-center pl-4 min-w-[180px] flex-1">
                <SfTooltip label={cartItem.book.name} placement="bottom">
                    <SfLink
                        href={`/products/${cartItem.book.slug}`}
                        variant="secondary"
                        className="no-underline line-clamp-2 typography-text-sm sm:typography-text-base font-medium "
                    >
                        {cartItem.book.name}
                    </SfLink>
                </SfTooltip>
                <span className="font-bold mr-2 mt-2 typography-text-sm sm:typography-text-base">
                    {toVietnameseCurrency(cartItem.book.price)}
                </span>
                {/* <div className="items-center mt-auto sm:flex">
                        <span className="font-bold ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
                            {`X ${cartItem.quantity} = ${toVietnameseCurrency(cartItem.book.price * cartItem.quantity)}`}
                        </span>
                    </div> */}
            </td>
            <td className="flex items-center mt-5">
                <QuantitySelector
                    max={(cartItem.book as any).stock || 999}
                    value={cartItem.quantity}
                    onChange={handleChangedQuantity}
                />
            </td>
            <td className="flex items-center">
                <BsFillTrashFill className="text-2xl text-red-500 cursor-pointer" onClick={handleRemove} />
            </td>
        </tr>
    );
}
