import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ICartItem {
  id: number;
  quantity: number;
  book: BookPreviewDto;
}
interface ICartState {
  cart: ICartItem[];
  total: number;
}

const initialState: ICartState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ book: BookPreviewDto; quantity: number }>
    ) => {
      const { book, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === book.id);
      if (item) {
        item.quantity += quantity;
        state.total += quantity * book.price;
      } else {
        state.cart.push({ id: book.id, quantity, book });
        state.total += quantity * book.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        state.total -= item.quantity * item.book.price;
        state.cart = state.cart.filter((item) => item.id !== id);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        state.total += (quantity - item.quantity) * item.book.price;
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      const { book, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === book.id);
      if (item) {
        item.quantity += quantity;
        state.total += quantity * book.price;
      } else {
        state.cart.push({ id: book.id, quantity, book });
        state.total += quantity * book.price;
      }
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
export const selectCart = (state: RootState) => state.cart;

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (payload: { book: BookPreviewDto; quantity: number }, thunkAPI) => {
    const { book, quantity } = payload;
    //todo: call api to add to cart
    return { book, quantity };
  }
);
