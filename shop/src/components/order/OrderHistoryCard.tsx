import { PAYMENT_STATUS_STR, PaymentProvider } from "@/core/types/server-dto/checkoutDto";
import { OrderDetailDto, OrderDto, OrderStatus, OrderStatusString } from "@/core/types/server-dto/orderDto";
import { mergeClassNames, toVietnameseCurrency } from "@/utils";
import { SfButton } from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    order: OrderDto;
}

export default function OrderHistoryCard({ order, className = "", ...rest }: Props) {
    console.log(order);
    return (
        <div className={mergeClassNames("shadow-md border", className)}>
            <div className="border-b p-5 grid-rows-2 grid bg-gray-100 grid-flow-col gap-2">
                <span className="typography-body-1 font-semibold">Mã đơn hàng</span>
                <span className="typography-body-1">{order.id}</span>
                <span className="typography-body-1 font-semibold">Ngày đặt</span>
                <span className="typography-body-1">{new Date(order.createdAt).toLocaleString()}</span>
                <span className="typography-body-1 font-semibold">Tổng tiền</span>
                <span className="typography-body-1">{toVietnameseCurrency(order.total)}</span>
                <span className="typography-body-1 font-semibold">Trạng thái đơn hàng</span>
                <span className="typography-body-1">{OrderStatusString[order.status]}</span>
                <span className="typography-body-1 font-semibold">Trạng thái thanh toán</span>
                <span className="typography-body-1">{PAYMENT_STATUS_STR[order.paymentDetail?.status!]}</span>
            </div>
            <div className={mergeClassNames("p-5 gap-y-4 flex flex-col", className)}>
                {order.orderDetails.map((orderDetail) => (
                    <Item key={orderDetail.bookId} orderDetail={orderDetail} />
                ))}
            </div>
        </div>
    );
}
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    orderDetail: OrderDetailDto;
}
function Item({ orderDetail, className = "", ...rest }: ItemProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-x-4">
                <Image
                    className="w-24 aspect-[3/4]"
                    src={orderDetail.book?.thumbnailUrl!}
                    width={400}
                    height={400}
                    alt="Picture of the author"
                />
                <div className="max-w-xs flex flex-col gap-y-1 pt-1">
                    <div className="typography-body-1 font-semibold">{orderDetail.book?.title}</div>
                    <div className="typography-body-1">
                        {toVietnameseCurrency(orderDetail.book?.price! * orderDetail.quantity)}
                    </div>
                    <div className="typography-body-1">Số lượng: {orderDetail.quantity}</div>
                    <div className="typography-body-1">
                        Thành tiền: {toVietnameseCurrency(orderDetail.quantity * orderDetail.book?.price!)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
                <SfButton as={Link} href={`/products/${orderDetail.book?.slug}`}>
                    Xem sản phẩm
                </SfButton>
            </div>
        </div>
    );
}
