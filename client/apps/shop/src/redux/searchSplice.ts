import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AdvancedSearchDto } from '@shared/types/advancedSearchDto';
const initialState: AdvancedSearchDto = {
  isAsc: false,
  sortBy: 'createdAt',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAttribute(
      state: AdvancedSearchDto,
      action: PayloadAction<{
        key: keyof AdvancedSearchDto;
        value: any;
      }>
    ) {
      const { key, value } = action.payload;
      (state[key] as any) = value;
    },
    resetSearch(state: AdvancedSearchDto) {
      window.dispatchEvent(new Event('clear-search'));
      return initialState;
    },
  },
});
export default searchSlice.reducer;

export const { setSearchAttribute, resetSearch } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;
export const selectSearchAttribute = (
  state: RootState,
  key: keyof AdvancedSearchDto
) => state.search[key];
