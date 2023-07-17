import { AddToCartDto, CartItemDto } from '@/lib/types/cartItemDto';
import api from '../api';
class CartApiService {
  
  getToken() {
    return localStorage.getItem('token');
  }
  async getCartItems(): Promise<CartItemDto[]> {
    const response = await api.get('CartItem', {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return response.data;
  }
  async addToCart(addToCartDto: AddToCartDto): Promise<CartItemDto> {
    const response = await api.post('CartItem', addToCartDto, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return response.data;
  }
  async deleteCartItem(id: number): Promise<boolean> {
    const response = await api.delete(`CartItem/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return response.data;
  }
  async clearCart(): Promise<boolean> {
    const response = await api.delete('CartItem', {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return response.data;
  }
  async setCartItemQuantity(addToCartDto: AddToCartDto): Promise<CartItemDto> {
    const response = await api.patch(
      'CartItem/SetCartItemQuantity',
      addToCartDto,
      {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      }
    );
    return response.data;
  }
}
export default new CartApiService();
