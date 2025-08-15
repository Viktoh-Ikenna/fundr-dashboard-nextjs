export interface Transaction {
  id: string;
  amount: number;
  type: 'Transfer' | 'Withdrawal' | 'Deposit' | 'Request';
  date: string;
  time: string;
  status: 'Processed' | 'Failed' | 'Pending';
  transactionId: string;
}

export interface RevenueData {
  month: string;
  value: number;
}

export interface AccountDetails {
  bankName: string;
  accountNumber: string;
  balance: number;
}

export interface DashboardStats {
  revenue: {
    current: number;
    previous: number;
    percentage: number;
    data: RevenueData[];
  };
  accountDetails: AccountDetails;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface LoadingState {
  dashboard: boolean;
  transactions: boolean;
}

export type TimeRange = 'Today' | 'Last 7 days' | 'Last 30 days' | 'Weekly';
export type TransactionFilter = 'All Accounts' | 'Savings' | 'Current';

export interface Filters {
  timeRange: TimeRange;
  accountType: TransactionFilter;
  dateRange?: {
    start: string;
    end: string;
  };
} 