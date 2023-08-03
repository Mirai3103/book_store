import SelectDropdown from "@/components/Select";
import OrderHistoryCard from "@/components/order/OrderHistoryCard";
import { OrderApiService } from "@/core/services/orderApiService";
import { AppSession } from "@/core/types/next-auth.type";
import { PaymentProvider, PaymentStatus } from "@/core/types/server-dto/checkoutDto";
import { OrderDto, OrderStatus } from "@/core/types/server-dto/orderDto";
import { AUTH_OPTIONS } from "@/pages/api/auth/[...nextauth]";
import { SfSelect } from "@storefront-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
interface Props {
    orders: OrderDto[];
}
enum OrderType {
    All,
    PendingPayment,
    PendingDelivery,
    Done,
    Cancelled,
    PaymentFailed,
}

const filterOrders = {
    [OrderType.All]: (orders: OrderDto[]) => orders,
    [OrderType.PendingPayment]: (orders: OrderDto[]) =>
        orders.filter(
            (order) =>
                order.status == OrderStatus.Pending &&
                order.paymentDetail?.provider != PaymentProvider.COD &&
                order.paymentDetail?.status == PaymentStatus.Pending
        ),
    [OrderType.PendingDelivery]: (orders: OrderDto[]) => orders.filter((order) => order.status == OrderStatus.Shipping),
    [OrderType.Done]: (orders: OrderDto[]) => orders.filter((order) => order.status == OrderStatus.Delivered),
    [OrderType.Cancelled]: (orders: OrderDto[]) => orders.filter((order) => order.status == OrderStatus.Cancelled),
    [OrderType.PaymentFailed]: (orders: OrderDto[]) =>
        orders.filter(
            (order) =>
                order.paymentDetail?.provider != PaymentProvider.COD &&
                order.paymentDetail?.status == PaymentStatus.Failed
        ),
};
const filterOptions = [
    { label: "Tất cả", value: OrderType.All },
    { label: "Chờ thanh toán", value: OrderType.PendingPayment },
    { label: "Chờ giao hàng", value: OrderType.PendingDelivery },
    { label: "Đã giao hàng", value: OrderType.Done },
    { label: "Đã hủy", value: OrderType.Cancelled },
    { label: "Thanh toán thất bại", value: OrderType.PaymentFailed },
];

export default function OrderPage({ orders }: Props) {
    const [selectedFilter, setSelectedFilter] = React.useState<OrderType>(OrderType.All);
    return (
        <div className="mt-4 ">
            <h2 className="typography-headline-3 font-semibold">Lịch sử đơn hàng</h2>
            <div className="flex justify-between  max-w-xs items-center">
                <SfSelect className="mt-4" onChange={(e) => setSelectedFilter(Number(e.target.value))}>
                    {filterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SfSelect>
            </div>
            <div className="flex mt-4 flex-col gap-8">
                {filterOrders[selectedFilter](orders).map((order) => (
                    <OrderHistoryCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res } = context;
    const session = (await getServerSession(req, res, AUTH_OPTIONS)) as AppSession;
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const orders = await OrderApiService.getOrdersByUser({
        accessToken: session.accessToken,
        axiosConfig: {
            baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
        },
    });
    return {
        props: {
            orders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        },
    };
};
