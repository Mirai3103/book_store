import { PaymentProvider } from './paymentProvider';
import { BookPreviewDto } from './bookPreviewDto';
import { PaymentDetailDto } from './paymentDetailDto';
import { AddressDto } from './addressDto';
import { OrderStatus } from './orderStatus';

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