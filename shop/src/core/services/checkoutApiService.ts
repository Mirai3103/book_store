import axios, { AxiosRequestConfig } from "axios";
export class CheckoutApiService {
    public static async checkPaymentStatus({
        accessToken,
        paymentId,
        orderId,
        axiosConfig,
    }: {
        accessToken: string;
        paymentId: string;
        orderId: string;
        axiosConfig?: AxiosRequestConfig;
    }) {
        const res = await axios.get(`payment/check-status?paymentId=${paymentId}&orderId=${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
}
