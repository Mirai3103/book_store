import AddressApiService from "@/core/services/addressApiService";
import { OrderApiService, OrderResponseHandleFactory } from "@/core/services/orderApiService";
import { AddressDto } from "@/core/types/server-dto/addressDto";
import { PaymentProvider } from "@/core/types/server-dto/checkoutDto";
import useStore from "@/libs/hooks/useStore";
import { OrderItem, Step } from "@/pages/user/cart";
import useSessionStore from "@/store/sessionStore";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";
import { SfButton, SfRadio } from "@storefront-ui/react";
import Image from "next/image";
import React from "react";
import { useToast } from "../ui/use-toast";

interface Props {
    orderItem: OrderItem[];
    setStep: (step: Step) => void;
}

export default function OrderPage({ orderItem: order, setStep }: Props) {
    React.useEffect(() => {
        if (order.length === 0) {
            setStep(Step.Cart);
        }
    }, [order, setStep]);
    const orderItem = order;
    const [addresses, setAddresses] = React.useState<AddressDto[]>([]);
    const { accessToken: token, user } = useStore(useSessionStore, (state) => state.session)!;
    const [selectedAddress, setSelectedAddress] = React.useState<AddressDto | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentProvider>(PaymentProvider.COD);
    React.useEffect(() => {
        if (typeof token !== "string") return;
        if (!token) return;
        AddressApiService.getMyAddress({
            accessToken: token,
        }).then((res) => {
            setAddresses(res);
            const primaryAddress = res.find((address) => address.isPrimary);
            setSelectedAddress(primaryAddress ?? res[0]);
        });
    }, [token]);

    const { toast } = useToast();
    const handleCreateOrder = () => {
        OrderApiService.createOrder({
            accessToken: token!,
            orderRequestDto: {
                paymentProviderString: selectedPaymentMethod,
                addressId: selectedAddress?.id!,
                userId: user?.id!,
                orderDetails: orderItem.map((item) => ({
                    bookId: item.bookId,
                    quantity: item.quantity,
                })),
            },
        })
            .then((res) => {
                const handleResponse = OrderResponseHandleFactory.createOrderResponseHandle(selectedPaymentMethod);
                handleResponse(res);
                setStep(Step.EndOrder);
            })
            .catch((err) => {
                toast({
                    variant: "error",
                    title: "Đặt hàng thất bại",
                    description: err.message,
                });
                setStep(Step.Cart);
            });
    };
    return (
        <div className="flex gap-x-20 mt-8">
            <div className="flex-1 ">
                <div className="flex flex-col border shadow-md p-4 rounded-lg">
                    <h2 className="typography-headline-3 mx-2 my-4 font-semibold">
                        {`Thông tin đơn hàng (${orderItem.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm)`}
                    </h2>
                    <h3 className="typography-headline-4 mx-2 my-4 font-semibold">Chi tiết sản phẩm</h3>
                    <table className="w-full mx-4">
                        <thead>
                            <tr className="border-b">
                                <th className="typography-text-lg font-semibold text-center">STT</th>
                                <th className="typography-text-lg font-semibold text-center">Sản phẩm</th>
                                <th className="typography-text-lg font-semibold text-center">Giá</th>
                                <th className="typography-text-lg font-semibold text-center">Số lượng</th>
                                <th className="typography-text-lg font-semibold text-center">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItem.map((item, index) => (
                                <tr className="border-b" key={item.bookId}>
                                    <td className="typography-text-lg text-center">{index + 1}</td>
                                    <td className="typography-text-lg py-2 text-left">
                                        <div className="flex items-center">
                                            <Image
                                                className="w-20 aspect-[2/3] object-cover"
                                                src={item.book.thumbnailUrl}
                                                alt={item.book.title}
                                                width={200}
                                                height={300}
                                            />
                                            <div className="ml-4">
                                                <h4 className="typography-text-lg font-semibold">{item.book.title}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="typography-text-lg text-center">
                                        {toVietnameseCurrency(item.book.price)}
                                    </td>
                                    <td className="typography-text-lg text-center">{item.quantity}</td>

                                    <td className="typography-text-lg text-center">
                                        {toVietnameseCurrency(item.book.price * item.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-b">
                                <td colSpan={4} className="typography-text-lg font-semibold text-right">
                                    Tổng tiền
                                </td>
                                <td className="typography-text-lg py-3 font-semibold text-center">
                                    {toVietnameseCurrency(
                                        orderItem.reduce((acc, item) => acc + item.book.price * item.quantity, 0)
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="typography-headline-4 mx-2 mt-4 font-semibold">Địa chỉ nhận hàng</h2>
                        {selectedAddress && (
                            <div className={mergeClassNames("flex hover:shadow border-b py-4 justify-between px-10")}>
                                <div className="flex typography-text-base flex-col gap-1">
                                    <div>
                                        <span className="font-semibold">{selectedAddress.receiverName}</span>
                                        <span className="text-gray-500"> | {selectedAddress.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">{selectedAddress.particularAddress}</span>
                                    </div>
                                    <div className="text-gray-500">
                                        {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.province}
                                    </div>
                                    {selectedAddress.isPrimary && (
                                        <div>
                                            <span className="text-primary-600  p-1 rounded-md border border-primary-700">
                                                Mặc định
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center gap-2 items-center">
                                    <div>
                                        <SfButton variant="tertiary" className="">
                                            Thay đổi
                                        </SfButton>
                                    </div>
                                </div>
                            </div>
                        )}

                        <h2 className="typography-headline-4 mx-2 mt-4 font-semibold">Phương thức thanh toán</h2>
                        <div className="flex flex-col border-b pb-5 mb-2 gap-2 px-6">
                            {PAYMENT_METHODS.map((method) => (
                                <label key={method.id} className="flex items-center mt-4 cursor-pointer">
                                    <SfRadio
                                        name="payment-method"
                                        value={method.id}
                                        checked={selectedPaymentMethod === method.id}
                                        onChange={(event) => {
                                            setSelectedPaymentMethod(event.target.value as any);
                                        }}
                                    />
                                    <div className="flex gap-x-2 ml-2  items-center">
                                        {method.icon && (
                                            <Image src={method.icon} alt={method.id} width={28} height={28} />
                                        )}
                                        <span className="text-base font-normal leading-6 font-body">{method.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-y-2 typography-text-lg flex-col items-end">
                            <div className="flex min-w-[350px]">
                                <span className="basis-1/2">Tổng tiền hàng:</span>
                                <span className="ml-2 text-end basis-1/2 font-semibold">
                                    {toVietnameseCurrency(
                                        orderItem.reduce((acc, item) => acc + item.book.price * item.quantity, 0)
                                    )}
                                </span>
                            </div>
                            <div className="flex min-w-[350px]">
                                <span className="basis-1/2">Phí vận chuyển:</span>
                                <span className="ml-2 text-end basis-1/2 font-semibold">{toVietnameseCurrency(0)}</span>
                            </div>
                            <div className="flex min-w-[350px] items-center">
                                <span className="basis-1/2">Tổng thanh toán:</span>
                                <span className="ml-2 text-primary-600 typography-headline-2 text-end basis-1/2 font-semibold">
                                    {toVietnameseCurrency(
                                        orderItem.reduce((acc, item) => acc + item.book.price * item.quantity, 0)
                                    )}
                                </span>
                            </div>
                            <div className="flex min-w-[300px]">
                                <SfButton
                                    className="mt-4 w-full text-lg"
                                    size="lg"
                                    variant="primary"
                                    onClick={handleCreateOrder}
                                >
                                    Đặt hàng
                                </SfButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PAYMENT_METHODS = [
    {
        id: PaymentProvider.COD,
        name: "Thanh toán khi nhận hàng (COD)",
    },
    {
        id: PaymentProvider.Momo,
        name: "Thanh toán qua Momo",
        icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
];

const defaultobj = [
    {
        userId: "e5adc446-2d6f-11ee-bdca-f3e08705827e",
        bookId: 13549,
        quantity: 2,
        book: {
            id: 13549,
            title: "Tường Lửa",
            name: "Tường Lửa",
            slug: "tuong-lua",
            price: 125000,
            thumbnailUrl:
                "https://res.cloudinary.com/dkvga054t/image/upload/v1687939362/bookstore/y2iwaequhio72jplj5jv.jpg",
            createdAt: "2023-06-01T05:47:51.44",
            stock: 1832,
        },
        createdAt: "2023-07-29T16:38:48.135503",
        updatedAt: "2023-07-29T16:38:48.112932",
        checked: true,
    },
    {
        userId: "e5adc446-2d6f-11ee-bdca-f3e08705827e",
        bookId: 5190,
        quantity: 2,
        book: {
            id: 5190,
            title: "Bóc Mẽ Những Cái Cớ Của Đàn Ông",
            name: "Bóc Mẽ Những Cái Cớ Của Đàn Ông",
            slug: "boc-me-nhung-cai-co-cua-dan-ong",
            price: 89000,
            thumbnailUrl:
                "https://res.cloudinary.com/dkvga054t/image/upload/v1687936562/bookstore/xkfgrh1yinzvksirwvqu.jpg",
            createdAt: "2023-06-01T02:50:26.643",
            stock: 425,
        },
        createdAt: "2023-07-29T12:41:38.0452",
        updatedAt: "2023-07-29T12:41:38.019308",
        checked: true,
    },
    {
        userId: "e5adc446-2d6f-11ee-bdca-f3e08705827e",
        bookId: 18129,
        quantity: 2,
        book: {
            id: 18129,
            title: "Thói Quen Tốt Cho Sức Khoẻ Của Bé - Bé Nhớ Ăn Uống Lành Mạnh",
            name: "Thói Quen Tốt Cho Sức Khoẻ Của Bé - Bé Nhớ Ăn Uống Lành Mạnh",
            slug: "thoi-quen-tot-cho-suc-khoe-cua-be-be-nho-an-uong-lanh-manh",
            price: 27000,
            thumbnailUrl:
                "https://res.cloudinary.com/dkvga054t/image/upload/v1688022157/bookstore/mgnrvcdqpqkijdchjyv5.jpg",
            createdAt: "2023-06-01T12:17:48.23",
            stock: 3085,
        },
        createdAt: "2023-07-29T00:59:59.579669",
        updatedAt: "2023-07-29T00:59:59.544823",
        checked: true,
    },
];
