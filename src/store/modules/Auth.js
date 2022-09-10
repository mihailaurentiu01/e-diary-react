import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const AuthActions = useSlice.actions;

export default useSlice.reducer;
