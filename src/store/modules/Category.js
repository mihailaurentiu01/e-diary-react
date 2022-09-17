import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Category',
  initialState: {
    categories: [],
    selectedCategory: '',
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = state.categories.find(
        (category) => category.id === action.payload
      );
    },
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
