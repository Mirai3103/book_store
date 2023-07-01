import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import utilityReducer from './utilitySplice';
import authReducer from './authSplice';
import cartReducer from './cartSplice';
export const store = configureStore({
  reducer: combineReducers({
    utility: utilityReducer,
    auth: authReducer,
    cart: cartReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
