import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import cartApiService from '@shared/Utils/Services/cartApiService';
interface ICartItem {
  id: number;
  quantity: number;
  book: BookPreviewDto;
}
interface ICartState {
  cart: ICartItem[];
  isLoading?: boolean;
  lastedError?: string;
}

const initialState: ICartState = {
  cart: [],
  isLoading: false,
  lastedError: undefined,
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
      } else {
        state.cart.push({ id: book.id, quantity, book });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
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
        item.quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { book, quantity } = action.payload;
        const item = state.cart.find((item) => item.id === book.id);
        if (item) {
          item.quantity += quantity;
        } else {
          state.cart.push({ id: book.id, quantity, book });
        }
        state.isLoading = false;
        state.lastedError = undefined;
      })
      .addCase(addToCartAsync.pending, (state, action) => {
        state.isLoading = true;
        state.lastedError = undefined;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.lastedError = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartTotalItem = (state: RootState) => state.cart.cart.length;
export const selectIsLoadingCart = (state: RootState) => state.cart.isLoading;
export const selectLastedErrorCart = (state: RootState) =>
  state.cart.lastedError;

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (payload: { book: BookPreviewDto; quantity: number }, thunkAPI) => {
    const { book, quantity } = payload;
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await cartApiService.addToCart({ bookId: book.id, quantity });
    return { book, quantity };
  }
);
