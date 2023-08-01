import axios from "axios";
import { OrderDetailDto, OrderRequestDto } from "../types/server-dto/orderDto";

export class OrderApiService {
    public static async createOrder({
        accessToken,
        orderRequestDto,
    }: {
        accessToken: string;
        orderRequestDto: OrderRequestDto;
    }) {
        const res = await axios.post<OrderDetailDto>("order", orderRequestDto, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }
}
