import { AddToCartDto, CartItemDto } from "@appTypes/server-dto/cartItemDto";
import axios from "axios";
class CartApiService {
    static async getCartItems({ accessToken }: Record<"accessToken", string>): Promise<CartItemDto[]> {
        const response = await axios.get<CartItemDto[]>("CartItem", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
    static async addToCart(addToCartDto: AddToCartDto, accessToken: string): Promise<CartItemDto> {
        const response = await axios.post("CartItem", addToCartDto, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
    static async deleteCartItem(id: number, accessToken: string): Promise<boolean> {
        const response = await axios.delete(`CartItem/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
    static async clearCart({ accessToken }: Record<"accessToken", string>): Promise<boolean> {
        const response = await axios.delete("CartItem", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
    static async setCartItemQuantity(
        addToCartDto: AddToCartDto,
        { accessToken }: Record<"accessToken", string>
    ): Promise<CartItemDto> {
        const response = await axios.patch("CartItem/SetCartItemQuantity", addToCartDto, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
}
export default CartApiService;
