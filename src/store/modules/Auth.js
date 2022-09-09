import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Auth',
  initialState: {
    sample: 'Hello world',
  },
  reducers: {},
});

export const AuthActions = useSlice.actions;

export default useSlice.reducer;
