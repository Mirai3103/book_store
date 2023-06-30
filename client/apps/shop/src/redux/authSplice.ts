import { LoginResponse } from '@client/libs/shared/src/lib/types/authDto';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { RootState } from './store';

interface User {
  userId: string;
  email: string;
  displayName: string;
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
      state.isAuthenticated = true;
      state.user = jwt_decode(action.payload.accessToken);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.user = jwt_decode(action.payload);
    },
    removeToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
