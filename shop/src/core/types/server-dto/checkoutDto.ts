export enum PaymentProvider {
    COD = "COD",
    // Paypal = 1,
    Momo = "MOMO",
    // ZaloPay = 3,
}
export const PAYMENT_STATUS_STR = ["Đang chờ thanh toán", "Đã thanh toán", "Thanh toán thất bại"];
export enum PaymentStatus {
    Pending = 0,
    Success = 1,
    Failed = 2,
}
export interface PaymentDetailDto {
    id: string;
    amount: number;
    provider: PaymentProvider;
    status: PaymentStatus;
    createdAt: string;
    updatedAt: string | null;
    metadata: string;
}
