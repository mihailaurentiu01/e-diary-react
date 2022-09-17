import { configureStore } from '@reduxjs/toolkit';

import Auth from './modules/Auth';
import Navbar from './modules/Navbar';
import Snackbar from './modules/Snackbar';
import Category from './modules/Category';

const store = configureStore({
  reducer: { Auth, Navbar, Snackbar, Category },
});

export default store;
