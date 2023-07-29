import CartApiService from "@/core/services/cartApiService";
import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
export interface CartState {
    cartItems: CartItemDto[];
    fetch(accessToken: string): Promise<void>;
    addAsync(item: CartItemDto, accessToken: string): Promise<void>;
    removeAsync(id: number, accessToken: string): Promise<void>;
    clearAsync(accessToken: string): Promise<void>;
    setQuantityAsync(id: number, quantity: number, accessToken: string): Promise<void>;
}

const createCartSlice: StateCreator<CartState> = (set, get) => ({
    cartItems: [],

    fetch: async (accessToken: string) => {
        try {
            const data = await CartApiService.getCartItems({ accessToken });
            set({
                cartItems: data,
            });
        } catch (e) {
            console.log(e);
        }
    },
    addAsync: async (item: CartItemDto, accessToken) => {
        try {
            await CartApiService.addToCart(item, accessToken);
            let existingItem = get().cartItems.find((i) => i.bookId == item.bookId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                set({
                    cartItems: [...get().cartItems, item],
                });
            }
        } catch (e) {
            console.log(e);
        }
    },
    removeAsync: async (id: number, accessToken) => {
        try {
            await CartApiService.deleteCartItem(id, accessToken);
            set({
                cartItems: get().cartItems.filter((item) => item.bookId != id),
            });
        } catch (e) {
            console.log(e);
        }
    },
    clearAsync: async (accessToken) => {
        try {
            await CartApiService.clearCart({ accessToken });
            set({
                cartItems: [],
            });
        } catch (e) {
            console.log(e);
        }
    },
    async setQuantityAsync(id, quantity, accessToken) {
        await CartApiService.setCartItemQuantity(
            {
                bookId: id,
                quantity: quantity,
            },
            { accessToken }
        );
    },
});
const useCartStore = create(persist(createCartSlice, { name: "cart" }));
export default useCartStore;
