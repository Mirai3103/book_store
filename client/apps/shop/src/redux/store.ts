import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import utilitySplice from './utilitySplice';
import authSplice from './authSplice';
export const store = configureStore({
  reducer: combineReducers({
    utility: utilitySplice,
    auth: authSplice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
