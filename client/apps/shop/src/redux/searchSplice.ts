import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AdvancedSearchDto } from '@shared/types/advancedSearchDto';

interface SearchState {
  filters: AdvancedSearchDto;
  resultOf: string;
}

const initialState: SearchState = {
  filters: {
    isAsc: false,
    sortBy: 'createdAt',
  },
  resultOf: '',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAttribute(
      state: SearchState,
      action: PayloadAction<{
        key: keyof AdvancedSearchDto;
        value: any;
      }>
    ) {
      const { key, value } = action.payload;
      (state.filters[key] as any) = value;
    },
    resetSearch(state: SearchState) {
      window.dispatchEvent(new Event('clear-search'));
      return initialState;
    },
    setResultsOf(state: SearchState, action: PayloadAction<string>) {
      state.resultOf = action.payload;
    },
  },
});
export default searchSlice.reducer;

export const { setSearchAttribute, resetSearch } = searchSlice.actions;

export function selectFilters(state: RootState) {
  return state.search.filters;
}
export function selectResultOf(state: RootState) {
  return state.search.resultOf;
}
export const selectSearchAttribute = (
  state: RootState,
  key: keyof AdvancedSearchDto
) => state.search.filters[key];
