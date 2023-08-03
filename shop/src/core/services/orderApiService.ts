import { OrderDetailDto, OrderDto, OrderRequestDto } from "../types/server-dto/orderDto";
import { PaymentProvider } from "../types/server-dto/checkoutDto";
import axios, { AxiosRequestConfig } from "axios";
import Router from "next/router";

import type { ToastProps } from "@/components/ui/toast";
export class OrderApiService {
    public static async createOrder({
        accessToken,
        orderRequestDto,
    }: {
        accessToken: string;
        orderRequestDto: OrderRequestDto;
    }) {
        const res = await axios.post<OrderDto>("order", orderRequestDto, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
    public static async reCheckout({ accessToken, orderId }: { accessToken: string; orderId: string }) {
        const res = await axios.post<OrderDto>(`order/${orderId}/re-checkout`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }

    public static async getOrdersByUser({
        accessToken,
        axiosConfig = {},
    }: {
        accessToken: string;
        axiosConfig?: AxiosRequestConfig;
    }) {
        const res = await axios.get<OrderDto[]>("order/my-orders", {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
}

export class OrderResponseHandleFactory {
    public static createOrderResponseHandle(paymentProvider: PaymentProvider) {
        switch (paymentProvider) {
            case PaymentProvider.COD:
                return OrderResponseHandleFactory.CODHandle;
            case PaymentProvider.Momo:
                return OrderResponseHandleFactory.MomoHandle;
            default:
                throw new Error("Invalid payment provider");
        }
    }
    public static CODHandle(res: OrderDto) {
        const event: CustomEvent<ToastProps> = new CustomEvent("notify", {
            detail: {
                variant: "success",
                title: "Đặt hàng thành công",
            },
        });
        window.dispatchEvent(event);
        Router.push("/user/orders");

        return res;
    }
    public static MomoHandle(res: OrderDto) {
        const metadata = JSON.parse(res.paymentDetail?.metadata || "{}") as MomoResponse;
        if (metadata.resultCode === 0) {
            Router.push(metadata.payUrl);
        } else {
            throw new Error(metadata.message);
        }
    }
}

interface MomoResponse {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    responseTime: number;
    message: string;
    resultCode: number;
    payUrl: string;
    deeplink: string;
    qrCodeUrl: string;
    applink: string;
    deeplinkMiniApp: string;
}
