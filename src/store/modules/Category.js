import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Category',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
