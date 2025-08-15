import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DashboardStats, TimeRange } from '../types';
import { mockApi } from '../utils/mockApi';


export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (timeRange?: TimeRange) => {
    const response = await mockApi.getDashboardStats(timeRange);
    if (response.status === 'error') {
      throw new Error(response.message || 'Failed to fetch dashboard stats');
    }
    return response.data;
  }
);

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  selectedTimeRange: TimeRange;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
  selectedTimeRange: 'Last 7 days',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.selectedTimeRange = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      });
  },
});

export const { setTimeRange, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer; 