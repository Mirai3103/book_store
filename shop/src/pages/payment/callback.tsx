import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { AUTH_OPTIONS } from "../api/auth/[...nextauth]";
import { CheckoutApiService } from "@/core/services/checkoutApiService";
import { PaymentDetailDto, PaymentStatus } from "@/core/types/server-dto/checkoutDto";
import { SfButton, SfIconCheckCircle, SfIconError } from "@storefront-ui/react";
import { useRouter } from "next/router";
interface Props {
    paymentDetail: PaymentDetailDto;
}
export default function Callback({ paymentDetail }: Props) {
    const { replace } = useRouter();
    return (
        <div className="w-full min-h-[70vh] flex justify-center items-center">
            <div className="min-w-[300px] items-center flex flex-col gap-y-3 p-6 max-w-lg w-full shadow-lg border rounded-md">
                <h2 className="typography-headline-3  font-semibold">
                    {paymentDetail.status === PaymentStatus.Success ? "Thanh toán thành công" : "Thanh toán thất bại"}
                </h2>
                {paymentDetail.status === PaymentStatus.Success ? (
                    <SfIconCheckCircle size="3xl" className="text-green-500 text-3xl" />
                ) : (
                    <SfIconError size="3xl" className="text-negative-500 text-3xl" />
                )}
                <p className="typography-text-lg">
                    {paymentDetail.status === PaymentStatus.Success ? "Cảm ơn bạn đã mua hàng" : "Vui lòng thử lại"}
                </p>
                <div>
                    <SfButton className="mt-4" variant="secondary" onClick={() => replace("/")}>
                        <span>Quay lại trang chủ</span>
                    </SfButton>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { orderId, requestId } = context.query;
    if (!orderId || !requestId) {
        return {
            notFound: true,
        };
    }
    const paymentDetail = await CheckoutApiService.checkPaymentStatus({
        orderId: orderId as string,
        paymentId: requestId as string,
        axiosConfig: {
            baseURL: process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL,
        },
    });
    return {
        props: {
            paymentDetail,
        },
    };
};
