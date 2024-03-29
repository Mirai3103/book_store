import { BookDto } from "@/core/types/server-dto/bookDto";
import React from "react";
import {
    SfRating,
    SfButton,
    SfLink,
    SfCounter,
    SfIconShoppingCart,
    SfIconCompareArrows,
    SfIconFavorite,
    SfIconSell,
    SfIconPackage,
    SfIconRemove,
    SfIconAdd,
    SfIconWarehouse,
    SfIconSafetyCheck,
    SfIconShoppingCartCheckout,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useId, ChangeEvent } from "react";
import { clamp } from "@storefront-ui/shared";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";

import useCartStore from "@/store/cartStore";
import useStore from "@/libs/hooks/useStore";
import useSessionStore from "@/store/sessionStore";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
interface Props extends React.HTMLAttributes<HTMLElement> {
    book: BookDto;
}

export default function ProductBuyDetail({ book, className = "" }: Props) {
    const inputId = useId();
    const min = 1;
    const max = book.stock;
    const [value, { inc, dec, set }] = useCounter(min);
    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value: currentValue } = event.target;
        const nextValue = parseFloat(currentValue);
        set(Number(clamp(nextValue, min, max)));
    }
    const { session } = useStore(useSessionStore, (state) => state);
    const { addAsync, cartItems } = useStore(useCartStore, (state) => state);
    const { toast } = useToast();
    const handleAddToCart = async () => {
        if (!session) {
            return toast({
                variant: "error",
                description: "Bạn cần đăng nhập để thực hiện chức năng này",
            });
        }
        addAsync?.(
            {
                bookId: book.id,
                quantity: value,
                book: book,
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
                userId: session.user!.id,
            },
            session.accessToken
        ).then(() => {
            toast({
                variant: "success",
                description: "Thêm vào giỏ hàng thành công",
            });
            set(1);
        });
    };
    return (
        <section className={mergeClassNames("grow", className)}>
            {/* <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
                <SfIconSell size="sm" className="mr-1.5" />
                Sale
            </div> */}
            <h1 className="mb-1 font-bold typography-headline-3">{book.title}</h1>
            <strong className="block font-bold typography-headline-2 my-2">{toVietnameseCurrency(book.price)}</strong>
            <div className="inline-flex items-center mt-4 mb-2">
                <SfRating size="xs" value={3} max={5} />
                <SfCounter className="ml-1" size="xs">
                    123
                </SfCounter>
                <SfLink href="#" variant="secondary" className="ml-2 text-xs text-neutral-500">
                    123 reviews
                </SfLink>
            </div>
            <ul className=" grid-cols-2 my-2 gap-2 hidden md:grid">
                <li className="flex items-center gap-2">
                    Nhà cung cấp: <strong>{book.provider?.name}</strong>
                </li>
                <li className="flex items-center gap-2">
                    Tác giả: <strong>{book.author?.name}</strong>
                </li>
                <li className="flex items-center gap-2">
                    Nhà xuất bản: <strong>{book.publisher?.name}</strong>
                </li>
                {book.series && (
                    <li className="flex items-center gap-2">
                        Bộ sách: <strong>{book.series.name}</strong>
                    </li>
                )}
                <li className="flex items-center gap-2">
                    Danh mục: <strong>{book.category?.name}</strong>
                </li>
            </ul>
            <div className="py-4 mb-4 border-gray-200 border-y">
                <Link
                    href={"/user/cart"}
                    className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md"
                >
                    <SfIconShoppingCartCheckout />
                    {`Có ${cartItems?.find((item) => item.bookId === book.id)?.quantity || 0}   trong giỏ hàng`}
                </Link>

                <div className="items-start xs:flex">
                    <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
                        <div className="flex border border-neutral-300 rounded-md">
                            <SfButton
                                type="button"
                                variant="tertiary"
                                square
                                className="rounded-r-none p-3"
                                disabled={value <= min}
                                aria-controls={inputId}
                                aria-label="Decrease value"
                                onClick={() => dec()}
                            >
                                <SfIconRemove />
                            </SfButton>
                            <input
                                id={inputId}
                                type="number"
                                role="spinbutton"
                                className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                                min={min}
                                max={max}
                                value={value}
                                onChange={handleOnChange}
                            />
                            <SfButton
                                type="button"
                                variant="tertiary"
                                square
                                className="rounded-l-none p-3"
                                disabled={value >= max}
                                aria-controls={inputId}
                                aria-label="Increase value"
                                onClick={() => inc()}
                            >
                                <SfIconAdd />
                            </SfButton>
                        </div>
                        <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                            <strong className="text-neutral-900">{max}</strong> sản phẩm có sẵn
                        </p>
                    </div>
                    <SfButton
                        type="button"
                        size="lg"
                        className="w-full xs:ml-4"
                        slotPrefix={<SfIconShoppingCart size="sm" />}
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ hàng
                    </SfButton>
                </div>
                <div className="flex justify-center mt-4 gap-x-4"></div>
            </div>
            <div className="flex first:mt-4">
                <SfIconPackage size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
                <p className="text-sm">
                    Thời gian giao hàng dự kiến:
                    <SfLink href="#" variant="secondary" className="mx-1">
                        Chọn địa chỉ giao hàng
                    </SfLink>
                    để xem thời gian giao hàng chính xác.
                </p>
            </div>

            <div className="flex mt-4">
                <SfIconSafetyCheck size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
                <p className="text-sm">
                    Chính sách hoàn trả: 30 ngày hoàn trả
                    <SfLink href="#" variant="secondary" className="ml-1">
                        Xem chi tiết
                    </SfLink>
                </p>
            </div>
        </section>
    );
}
