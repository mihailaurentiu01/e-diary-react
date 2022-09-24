import { createSlice } from '@reduxjs/toolkit';

const useSlice = createSlice({
  name: 'Note',
  initialState: {
    notes: [],
    selectedNote: '',
  },
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
    setSelectedNote(state, action) {
      state.selectedNote = state.notes.find(
        (note) => note.id === action.payload
      );
    },
  },
});

export const NoteActions = useSlice.actions;

export default useSlice.reducer;
