import { PaymentProvider } from "./models/paymentDetail";
import { BookPreviewDto } from "./bookPreviewDto";
import { PaymentDetailDto } from "./checkoutDto";
import { AddressDto } from "./addressDto";
export enum OrderStatus {
    Pending = 0,
    Shipping = 1,
    Delivered = 2,
    Cancelled = 3,
}
export const OrderStatusString = ["Đang chờ xử lý", "Đang giao hàng", "Đã giao hàng", "Đã hủy"];

export interface OrderRequestDto {
    paymentProviderString: string;
    userId: string;
    addressId: number;
    orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
    quantity: number;
    bookId: number;
    book?: BookPreviewDto;
}

export interface OrderDto {
    createdAt: Date;
    id: string;
    userId: string;
    addressId: number;
    shippingFee: number;
    total: number;
    paymentDetail: PaymentDetailDto | null;
    orderDetails: OrderDetailDto[];
    address: AddressDto;
    status: OrderStatus;
}
