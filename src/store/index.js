import { configureStore } from '@reduxjs/toolkit';

import Auth from './modules/Auth';

const store = configureStore({
  reducer: { Auth },
});

export default store;
