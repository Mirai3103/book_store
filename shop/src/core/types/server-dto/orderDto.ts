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

export interface OrderRequestDto {
    paymentProviderString: string;
    getPaymentProviderEnum: PaymentProvider;
    userId: string;
    addressId: number;
    orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
    quantity: number;
    bookId: number;
    book: BookPreviewDto;
}

export interface OrderDto {
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
