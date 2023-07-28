import { SfDropdown, SfDropdownProps } from "@storefront-ui/react";
import React from "react";
import { ProductCardHorizontal } from "../products/ProductCard";
import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import CartItemSimple from "./CartItemSimple";

interface Props extends SfDropdownProps {
    trigger: React.ReactNode;
    open: boolean;
    onClose: () => void;
    cartItems: CartItemDto[];
}

export default function CartDropDown({ trigger, cartItems, open, onClose, ...props }: Props) {
    return (
        <SfDropdown className="z-50 " trigger={trigger} open={open} onClose={onClose}>
            <div className="bg-white max-w-[300px] shadow-lg border sm:max-w-sm  p-2 rounded-md text-black">
                {cartItems.length === 0 && (
                    <div className="text-center text-gray-500">Không có sản phẩm nào trong giỏ hàng</div>
                )}
                {cartItems.map((cartItem) => (
                    <CartItemSimple key={cartItem.bookId + "" + cartItem.userId} cartItem={cartItem} />
                ))}
            </div>
        </SfDropdown>
    );
}
