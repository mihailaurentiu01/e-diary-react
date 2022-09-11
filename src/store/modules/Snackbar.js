import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  type: '',
  message: '',
};

const useSlice = createSlice({
  name: 'Snackbar',
  initialState,
  reducers: {
    setOpen(state, action) {
      state.open = true;
    },
    setClose(state, action) {
      if (action.payload === 'clickaway') {
        return;
      }

      state.open = false;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const SnackbarActions = useSlice.actions;

export default useSlice.reducer;
