import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Auth',
  initialState: {
    isLoggedIn: false,
    user: { id: '' },
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const AuthActions = useSlice.actions;

export default useSlice.reducer;
