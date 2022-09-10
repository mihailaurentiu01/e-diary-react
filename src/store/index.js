import { configureStore } from '@reduxjs/toolkit';

import Auth from './modules/Auth';
import Navbar from './modules/Navbar';

const store = configureStore({
  reducer: { Auth, Navbar },
});

export default store;
