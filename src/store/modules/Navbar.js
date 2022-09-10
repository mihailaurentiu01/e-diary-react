import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Navbar',
  initialState: {
    isDrawerOpen: false,
    currentPage: 'E-diary',
  },
  reducers: {
    setDrawerIsOpen(state, action) {
      state.isDrawerOpen = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const NavbarActions = useSlice.actions;

export default useSlice.reducer;
