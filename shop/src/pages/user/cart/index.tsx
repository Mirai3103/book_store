import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import CartApiService from "@/core/services/cartApiService";
import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import useStore from "@/libs/hooks/useStore";
import { AUTH_OPTIONS } from "@/pages/api/auth/[...nextauth]";
import useCartStore from "@/store/cartStore";
import { SfCheckbox } from "@storefront-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
export type OrderItem = CartItemDto & { checked?: boolean };
export default function CartPage({ cartItems }: Props) {
    const { cartItems: upToDateCartItems } = useStore(useCartStore, (state) => state);
    const [cartItemsState, setCartItemsState] = React.useState<OrderItem[]>(cartItems);
    React.useEffect(() => {
        if (upToDateCartItems) {
            setCartItemsState(upToDateCartItems);
        }
    }, [upToDateCartItems]);
    const handleToggle = (id: string) => () => {
        setCartItemsState((prev) =>
            prev.map((item) => {
                if (item.bookId + "" == id) {
                    return {
                        ...item,
                        checked: !item.checked,
                    };
                }
                return item;
            })
        );
    };
    const isAllChecked = cartItemsState.every((item) => item.checked);
    const handleToggleCheckAll = () => {
        setCartItemsState((prev) =>
            prev.map((item) => {
                return {
                    ...item,
                    checked: !isAllChecked,
                };
            })
        );
    };
    return (
        <div className="flex gap-x-20 mt-8">
            <div className="flex-1 ">
                <div className="flex flex-col border shadow-md p-4 rounded-lg">
                    <h2 className="typography-headline-3 mx-2 my-4 font-semibold">
                        Giỏ hàng của bạn ({cartItemsState.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm)
                    </h2>
                    <div className="flex items-center border-b">
                        <div className="px-8 py-2 mb flex items-center gap-x-2">
                            <SfCheckbox id="checkboxall" checked={isAllChecked} onChange={handleToggleCheckAll} />
                            <label
                                className="ml-4 text-base text-gray-900 cursor-pointer font-body peer-disabled:text-disabled-900"
                                htmlFor="checkboxall"
                            >
                                Chọn tất cả
                            </label>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            {cartItemsState.map((cartItem) => (
                                <CartItem
                                    key={cartItem.book.id}
                                    cartItem={cartItem}
                                    handleToggleCheck={handleToggle(cartItem.bookId + "")}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <OrderSummary className="grow-0 basis-1/3 shrink-0" orderItems={cartItemsState} />
        </div>
    );
}

interface Props {
    cartItems: CartItemDto[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res } = context;
    const session: any = await getServerSession(req, res, AUTH_OPTIONS);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const items = await CartApiService.getCartItems(
        { accessToken: session.accessToken },
        {
            baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
        }
    );
    return {
        props: {
            cartItems: items,
        },
    };
};
