import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilter } from '../types';
import { mockApi } from '../utils/mockApi';


export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await mockApi.getTransactions(page, limit);
    if (response.status === 'error') {
      throw new Error(response.message || 'Failed to fetch transactions');
    }
    return response.data;
  }
);


export const filterTransactions = createAsyncThunk(
  'transactions/filterTransactions',
  async (filters: any) => {
    const response = await mockApi.getFilteredTransactions(filters);
    if (response.status === 'error') {
      throw new Error(response.message || 'Failed to filter transactions');
    }
    return response.data;
  }
);

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
  selectedAccountFilter: TransactionFilter;
  dateRange: {
    start: string;
    end: string;
  };
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalTransactions: 0,
  selectedAccountFilter: 'All Accounts',
  dateRange: {
    start: '2023-12-06',
    end: '2023-12-15',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setAccountFilter: (state, action: PayloadAction<TransactionFilter>) => {
      state.selectedAccountFilter = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.dateRange = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalTransactions = action.payload.total;
        state.totalPages = Math.ceil(action.payload.total / 8);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      
      .addCase(filterTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(filterTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to filter transactions';
      });
  },
});

export const { setCurrentPage, setAccountFilter, setDateRange, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer; 