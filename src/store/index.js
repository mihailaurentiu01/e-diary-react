import { configureStore } from '@reduxjs/toolkit';

import Auth from './modules/Auth';
import Navbar from './modules/Navbar';
import Snackbar from './modules/Snackbar';
import Category from './modules/Category';
import Note from './modules/Note';

const store = configureStore({
  reducer: { Auth, Navbar, Snackbar, Category, Note },
});

export default store;
