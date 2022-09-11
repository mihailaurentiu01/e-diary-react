import { configureStore } from '@reduxjs/toolkit';

import Auth from './modules/Auth';
import Navbar from './modules/Navbar';
import Snackbar from './modules/Snackbar';

const store = configureStore({
  reducer: { Auth, Navbar, Snackbar },
});

export default store;
