import { BookPreviewDto } from '@client/libs/shared/src/lib/types/bookPreviewDto';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import cartApiService from '@shared/Utils/Services/cartApiService';
export interface ICartItem {
  bookId: number;
  quantity: number;
  book: BookPreviewDto;
  isCheck?: boolean;
  error?: string;
}
interface ICartState {
  cart: ICartItem[];
  isLoading?: boolean;
}

const initialState: ICartState = {
  cart: [],
  isLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBill(
      state: ICartState,
      action: PayloadAction<{
        id: number;
      }>
    ) {
      const item = state.cart.find((item) => item.bookId === action.payload.id);
      if (item) {
        item.isCheck = true;
      }
    },
    toggleItem(
      state: ICartState,
      action: PayloadAction<{
        id: number;
      }>
    ) {
      const item = state.cart.find((item) => item.bookId === action.payload.id);
      if (item) {
        item.isCheck = !item.isCheck;
      }
    },
    addAllToBill(state: ICartState) {
      state.cart.forEach((item) => {
        item.isCheck = true;
      });
    },
    clearBill(state: ICartState) {
      state.cart.forEach((item) => {
        item.isCheck = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        window.dispatchEvent(
          new CustomEvent('noitfication', {
            detail: {
              message: 'Thêm vào giỏ hàng thành công',
              type: 'success',
            },
          })
        );
        const { book, quantity } = action.payload;
        const item = state.cart.find((item) => item.bookId === book.id);
        if (item) {
          item.quantity += quantity;
          item.error = undefined;
        } else {
          state.cart.push({ bookId: book.id, quantity, book });
        }
        state.isLoading = false;
      })
      .addCase(addToCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        const item = state.cart.find(
          (item) => item.bookId === action.meta.arg.book.id
        );
        if (item) {
          item.error = action.error.message;
        }
        window.dispatchEvent(
          new CustomEvent('noitfication', {
            detail: {
              message: action.error.message,
              type: 'error',
            },
          })
        );
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.cart = state.cart.filter((item) => item.bookId !== id);
        state.isLoading = false;
        window.dispatchEvent(
          new CustomEvent('noitfication', {
            detail: {
              message: 'Xóa khỏi giỏ hàng thành công',
              type: 'success',
            },
          })
        );
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        if (quantity <= 0) {
          return;
        }
        const item = state.cart.find((item) => item.bookId === id);
        if (item) {
          item.quantity = quantity;
        }
        state.isLoading = false;
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.cart = [];
        state.isLoading = false;
      })
      .addCase(updateCartItemAsync.rejected, (state, action) => {
        const { id, quantity } = action.meta.arg;
        const item = state.cart.find((item) => item.bookId === id);
        if (item) {
          item.error = action.error.message;
        }
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
export const { addToBill, addAllToBill, clearBill, toggleItem } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartTotalItem = (state: RootState) => state.cart.cart.length;
export const selectCartTotalItemInBill = (state: RootState) =>
  state.cart.cart.reduce((total, item) => {
    if (item.isCheck) {
      return total + item.quantity;
    }
    return total;
  }, 0);
export const selectIsLoadingCart = (state: RootState) => state.cart.isLoading;

export const selectIsAllChecked = (state: RootState) =>
  state.cart.cart.every((item) => item.isCheck);
export const selectTotalPrice = (state: RootState) =>
  state.cart.cart.reduce((total, item) => {
    if (item.isCheck) {
      return total + item.quantity * item.book.price;
    }
    return total;
  }, 0);
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (payload: { book: BookPreviewDto; quantity: number }, thunkAPI) => {
    const { book, quantity } = payload;
    await cartApiService.addToCart({ bookId: book.id, quantity });
    return { book, quantity };
  }
);

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (payload: undefined, thunkAPI) => {
    const cart = await cartApiService.getCartItems();
    return cart;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItemAsync',
  async (payload: { id: number }, thunkAPI) => {
    const { id } = payload;
    await cartApiService.deleteCartItem(id);
    return id;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItemAsync',
  async (payload: { id: number; quantity: number }, thunkAPI) => {
    const { id, quantity } = payload;
    if (quantity <= 0) {
      thunkAPI.dispatch(deleteCartItemAsync({ id }));
      return { id, quantity };
    }
    await cartApiService.setCartItemQuantity({
      bookId: id,
      quantity,
    });
    return { id, quantity };
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (payload: undefined, thunkAPI) => {
    await cartApiService.clearCart();
    return undefined;
  }
);
