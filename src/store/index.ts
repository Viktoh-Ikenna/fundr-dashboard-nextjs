import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 