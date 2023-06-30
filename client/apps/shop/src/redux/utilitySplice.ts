import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum Theme {
  Light = 'winter',
  DARK = 'dark',
}

interface UtilityState {
  theme: Theme;
  searchKeyword: string;
}

const initialState: UtilityState = {
  theme: Theme.Light,
  searchKeyword: '',
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === Theme.Light ? Theme.DARK : Theme.Light;
    },
    setSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setSearchKeyword } = utilitySlice.actions;

export default utilitySlice.reducer;

export const selectTheme = (state: RootState) => state.utility.theme;
export const selectSearchKeyword = (state: RootState) =>
  state.utility.searchKeyword;
