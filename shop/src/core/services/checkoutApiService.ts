import axios, { AxiosRequestConfig } from "axios";
import { PaymentDetailDto } from "../types/server-dto/checkoutDto";
export class CheckoutApiService {
    public static async checkPaymentStatus({
        accessToken,
        paymentId,
        orderId,
        axiosConfig = {},
    }: {
        accessToken?: string;
        paymentId: string;
        orderId: string;
        axiosConfig?: AxiosRequestConfig;
    }) {
        const res = await axios.get<PaymentDetailDto>(
            `payment/check-status?paymentId=${paymentId}&orderId=${orderId}`,
            {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    }
}
