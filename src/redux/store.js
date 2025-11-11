import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './slice';

const store = configureStore({
  reducer: {
    currency: currencySlice,
  },
});

export default store;
