import { LoginResponse } from '@client/libs/shared/src/lib/types/authDto';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import userApiService from '@client/libs/shared/src/lib/Utils/Services/userApiService';

interface User {
  userId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginResponse>) {
      state.token = action.payload.accessToken;
      localStorage.setItem('token', action.payload.accessToken);
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    removeToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const fetchUserProfileAsync = createAsyncThunk(
  'auth/fetchUserProfile',
  async () => {
    const response = await userApiService.getUserProfile();
    return response;
  }
);

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
