import { PaymentProvider } from './paymentProvider';
import { PaymentStatus } from './paymentStatus';

export interface PaymentDetailDto {
    id: string;
    amount: number;
    provider: PaymentProvider;
    status: PaymentStatus;
    createdAt: string;
    updatedAt: string | null;
    metadata: string;
}