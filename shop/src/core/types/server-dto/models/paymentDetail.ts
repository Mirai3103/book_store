export enum PaymentProvider {
    COD = 0,
    Paypal = 1,
    Momo = 2,
    ZaloPay = 3
}

export enum PaymentStatus {
    Pending = 0,
    Success = 1,
    Failed = 2
}

export interface PaymentDetail {
    id: string;
    amount: number;
    provider: PaymentProvider;
    status: PaymentStatus;
    createdAt: string;
    updatedAt: string | null;
    order: Order;
    metadata: string;
}

export interface Order {
    paymentDetailId: string | null;
    paymentDetail: PaymentDetail | null;
}