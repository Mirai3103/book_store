import { useState, useRef, useEffect } from "react";
import { SfButton, SfIconCheckCircle, SfIconClose, SfInput, SfLink } from "@storefront-ui/react";
import { toVietnameseCurrency } from "@/utils";
import { OrderItem } from "@/pages/user/cart";

// const orderDetails = {
//     items: 3,
//     originalPrice: 7824.97,
//     savings: -787.0,
//     delivery: 0.0,
//     tax: 457.47,
// };
interface Props extends React.HTMLAttributes<HTMLElement> {
    orderItems: OrderItem[];
}

export default function OrderSummary({ className = "", orderItems, ...props }: Props) {
    const errorTimer = useRef(0);
    const positiveTimer = useRef(0);
    const informationTimer = useRef(0);
    const [inputValue, setInputValue] = useState("");
    const [promoCode, setPromoCode] = useState(0);
    const [informationAlert, setInformationAlert] = useState(false);
    const [positiveAlert, setPositiveAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        clearTimeout(errorTimer.current);
        errorTimer.current = window.setTimeout(() => setErrorAlert(false), 5000);
        return () => {
            clearTimeout(errorTimer.current);
        };
    }, [errorAlert]);

    useEffect(() => {
        clearTimeout(positiveTimer.current);
        positiveTimer.current = window.setTimeout(() => setPositiveAlert(false), 5000);
        return () => {
            clearTimeout(positiveTimer.current);
        };
    }, [positiveAlert]);

    useEffect(() => {
        clearTimeout(informationTimer.current);
        informationTimer.current = window.setTimeout(() => setInformationAlert(false), 5000);
        return () => {
            clearTimeout(informationTimer.current);
        };
    }, [informationAlert]);

    const itemsCount = () => orderItems.reduce((acc, item) => acc + (item.checked ? item.quantity : 0), 0);

    const originalPrice = () =>
        orderItems.reduce((acc, item) => acc + (item.checked ? item.quantity * item.book.price : 0), 0);

    const checkPromoCode = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((promoCode === -100 && inputValue.toUpperCase() === "VSF2020") || !inputValue) return;
        if (inputValue.toUpperCase() === "VSF2020") {
            setPromoCode(-100);
            setPositiveAlert(true);
        } else {
            setErrorAlert(true);
        }
    };

    const removePromoCode = () => {
        setPromoCode(0);
        setInformationAlert(true);
    };

    return (
        <div className={` ${className}`} {...props}>
            <div className="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
                <div className="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
                    <p className="typography-headline-4 font-bold md:typography-headline-3">Chi tiết đơn hàng</p>
                    <p className="typography-text-base font-medium">( {itemsCount()} sản phẩm)</p>
                </div>
                <div className="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
                    <div className="flex justify-between typography-text-base pb-4">
                        <div className="flex flex-col grow pr-2">
                            <p>Tổng tiền</p>
                            <p className="typography-text-xs text-neutral-500">Giá gốc</p>
                            <p className="typography-text-xs text-secondary-700">Tiết kiệm</p>
                            <p className="my-2">Phí vận chuyển</p>
                            <p>Thuế</p>
                        </div>
                        <div className="flex flex-col text-right">
                            <p>{toVietnameseCurrency(originalPrice() - 20000)}</p>
                            <p className="typography-text-xs text-neutral-500">
                                {toVietnameseCurrency(originalPrice())}
                            </p>
                            <p className="typography-text-xs text-secondary-700">{toVietnameseCurrency(20000)}</p>
                            <p className="my-2">{toVietnameseCurrency(0)}</p>
                            <p>{toVietnameseCurrency(2000)}</p>
                        </div>
                    </div>
                    {promoCode ? (
                        <div className="flex items-center mb-5 py-5 border-y border-neutral-200">
                            <p>PromoCode</p>
                            <SfButton size="sm" variant="tertiary" className="ml-auto mr-2" onClick={removePromoCode}>
                                Remove
                            </SfButton>
                            <p>{toVietnameseCurrency(promoCode)}</p>
                        </div>
                    ) : (
                        <form className="flex gap-x-2 py-4 border-y border-neutral-200 mb-4" onSubmit={checkPromoCode}>
                            <SfInput
                                value={inputValue}
                                placeholder="Nhập mã giảm giá"
                                wrapperClassName="grow"
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                            <SfButton type="submit" variant="secondary">
                                Áp dụng
                            </SfButton>
                        </form>
                    )}
                    <p className="px-3 py-1.5 bg-secondary-100 text-secondary-700 typography-text-sm rounded-md text-center mb-4">
                        Bạn đã tiết kiệm ${Math.abs(2000).toFixed(2)} trong đơn hàng này
                    </p>
                    <div className="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200">
                        <p>Tổng</p>
                        <p>{toVietnameseCurrency(originalPrice() - 20000 + 2000 + 15000)}</p>
                    </div>
                    <SfButton size="lg" className="w-full">
                        Tiến hành đặt hàng
                    </SfButton>
                    <div className="typography-text-sm mt-4 text-center">
                        Bằng cách đặt hàng, bạn đồng ý với <SfLink href="#">Điều khoản sử dụng </SfLink> và {` `}{" "}
                        <SfLink href="#">Chính sách bảo mật </SfLink>
                        {` `}
                        của chúng tôi.
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
                {positiveAlert && (
                    <div
                        role="alert"
                        className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                    >
                        <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
                        <p className="py-2 mr-2">Mã giảm giá đã được áp dụng thành công</p>
                        <button
                            type="button"
                            className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
                            aria-label="Close positive alert"
                            onClick={() => setPositiveAlert(false)}
                        >
                            <SfIconClose className="hidden md:block" />
                            <SfIconClose size="sm" className="md:hidden block" />
                        </button>
                    </div>
                )}
                {informationAlert && (
                    <div
                        role="alert"
                        className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                    >
                        <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
                        <p className="py-2 mr-2">Mã giảm giá đã được gỡ bỏ thành công</p>
                        <button
                            type="button"
                            className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
                            aria-label="Close positive alert"
                            onClick={() => setInformationAlert(false)}
                        >
                            <SfIconClose className="hidden md:block" />
                            <SfIconClose size="sm" className="md:hidden block" />
                        </button>
                    </div>
                )}
                {errorAlert && (
                    <div
                        role="alert"
                        className="flex z-[100] items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                    >
                        <p className="py-2 mr-2">Mã giảm giá không hợp lệ</p>
                        <button
                            type="button"
                            className="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
                            aria-label="Close error alert"
                            onClick={() => setErrorAlert(false)}
                        >
                            <SfIconClose className="hidden md:block" />
                            <SfIconClose size="sm" className="md:hidden block" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
