import { Transaction, DashboardStats, ApiResponse, RevenueData } from '../types';


const mockRevenueDataSets = {
  'Today': [
    { month: '6AM', value: 120 },
    { month: '9AM', value: 340 },
    { month: '12PM', value: 580 },
    { month: '3PM', value: 720 },
    { month: '6PM', value: 450 },
    { month: '9PM', value: 280 },
  ],
  'Last 7 days': [
    { month: 'Mon', value: 2800 },
    { month: 'Tue', value: 3200 },
    { month: 'Wed', value: 2950 },
    { month: 'Thu', value: 3400 },
    { month: 'Fri', value: 4100 },
    { month: 'Sat', value: 3800 },
    { month: 'Sun', value: 3600 },
  ],
  'Last 30 days': [
    { month: 'Jan', value: 28000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 42000 },
    { month: 'Apr', value: 38000 },
    { month: 'May', value: 45000 },
    { month: 'Jun', value: 52000 },
    { month: 'Jul', value: 48000 },
    { month: 'Aug', value: 55000 },
    { month: 'Sep', value: 47000 },
    { month: 'Oct', value: 62000 },
    { month: 'Nov', value: 58000 },
    { month: 'Dec', value: 65000 },
  ],
  'Weekly': [
    { month: 'Mon', value: 2800 },
    { month: 'Tue', value: 3200 },
    { month: 'Wed', value: 2950 },
    { month: 'Thu', value: 3400 },
    { month: 'Fri', value: 4100 },
    { month: 'Sat', value: 3800 },
    { month: 'Sun', value: 3600 },
  ]
};




const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 125000,
    type: 'Transfer',
    date: 'Dec 15, 2023',
    time: '2:45PM',
    status: 'Processed',
    transactionId: 'TR_9284756103'
  },
  {
    id: '2',
    amount: 87500,
    type: 'Withdrawal',
    date: 'Dec 15, 2023',
    time: '1:30PM',
    status: 'Processed',
    transactionId: 'TR_9284756102'
  },
  {
    id: '3',
    amount: 65000,
    type: 'Deposit',
    date: 'Dec 14, 2023',
    time: '4:15PM',
    status: 'Processed',
    transactionId: 'TR_9284756101'
  },
  {
    id: '4',
    amount: 43200,
    type: 'Request',
    date: 'Dec 14, 2023',
    time: '11:20AM',
    status: 'Pending',
    transactionId: 'TR_9284756100'
  },
  {
    id: '5',
    amount: 95000,
    type: 'Transfer',
    date: 'Dec 13, 2023',
    time: '9:45AM',
    status: 'Processed',
    transactionId: 'TR_9284756099'
  },
  {
    id: '6',
    amount: 32500,
    type: 'Withdrawal',
    date: 'Dec 13, 2023',
    time: '3:10PM',
    status: 'Failed',
    transactionId: 'TR_9284756098'
  },
  {
    id: '7',
    amount: 78900,
    type: 'Transfer',
    date: 'Dec 12, 2023',
    time: '10:30AM',
    status: 'Processed',
    transactionId: 'TR_9284756097'
  },
  {
    id: '8',
    amount: 156000,
    type: 'Deposit',
    date: 'Dec 12, 2023',
    time: '8:15AM',
    status: 'Processed',
    transactionId: 'TR_9284756096'
  },
  {
    id: '9',
    amount: 42000,
    type: 'Request',
    date: 'Dec 11, 2023',
    time: '5:20PM',
    status: 'Processed',
    transactionId: 'TR_9284756095'
  },
  {
    id: '10',
    amount: 89500,
    type: 'Transfer',
    date: 'Dec 11, 2023',
    time: '12:45PM',
    status: 'Pending',
    transactionId: 'TR_9284756094'
  },
  {
    id: '11',
    amount: 67800,
    type: 'Withdrawal',
    date: 'Dec 10, 2023',
    time: '2:30PM',
    status: 'Processed',
    transactionId: 'TR_9284756093'
  },
  {
    id: '12',
    amount: 134000,
    type: 'Deposit',
    date: 'Dec 10, 2023',
    time: '10:15AM',
    status: 'Failed',
    transactionId: 'TR_9284756092'
  },
  {
    id: '13',
    amount: 58700,
    type: 'Transfer',
    date: 'Dec 9, 2023',
    time: '4:45PM',
    status: 'Processed',
    transactionId: 'TR_9284756091'
  },
  {
    id: '14',
    amount: 98200,
    type: 'Request',
    date: 'Dec 9, 2023',
    time: '11:30AM',
    status: 'Processed',
    transactionId: 'TR_9284756090'
  },
  {
    id: '15',
    amount: 76300,
    type: 'Withdrawal',
    date: 'Dec 8, 2023',
    time: '3:15PM',
    status: 'Pending',
    transactionId: 'TR_9284756089'
  },
  {
    id: '16',
    amount: 145000,
    type: 'Transfer',
    date: 'Dec 8, 2023',
    time: '9:20AM',
    status: 'Processed',
    transactionId: 'TR_9284756088'
  },
  {
    id: '17',
    amount: 52400,
    type: 'Deposit',
    date: 'Dec 7, 2023',
    time: '1:45PM',
    status: 'Processed',
    transactionId: 'TR_9284756087'
  },
  {
    id: '18',
    amount: 83600,
    type: 'Request',
    date: 'Dec 7, 2023',
    time: '10:30AM',
    status: 'Failed',
    transactionId: 'TR_9284756086'
  },
  {
    id: '19',
    amount: 167000,
    type: 'Transfer',
    date: 'Dec 6, 2023',
    time: '4:20PM',
    status: 'Processed',
    transactionId: 'TR_9284756085'
  },
  {
    id: '20',
    amount: 94800,
    type: 'Withdrawal',
    date: 'Dec 6, 2023',
    time: '11:15AM',
    status: 'Processed',
    transactionId: 'TR_9284756084'
  },
];


const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));


export const mockApi = {
  async getDashboardStats(timeRange: 'Today' | 'Last 7 days' | 'Last 30 days' | 'Weekly' = 'Last 7 days'): Promise<ApiResponse<DashboardStats>> {
    await delay(800);
    
    const data = mockRevenueDataSets[timeRange] || mockRevenueDataSets['Last 7 days'];
    const currentRevenue = data.reduce((sum: number, item: RevenueData) => sum + item.value, 0);
    

    const previousRevenue = timeRange === 'Today' ? 1800 : 
                           timeRange === 'Last 7 days' ? 20500 : 
                           timeRange === 'Weekly' ? 20500 : 450000;
    
    const percentage = Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100);
    
    return {
      status: 'success',
      data: {
        revenue: {
          current: currentRevenue,
          previous: previousRevenue,
          percentage: percentage,
          data: data
        },
        accountDetails: {
          bankName: 'STERLING BANK',
          accountNumber: '8000000000',
          balance: currentRevenue
        }
      }
    };
  },

  async getTransactions(page: number = 1, limit: number = 8): Promise<ApiResponse<{ transactions: Transaction[], total: number }>> {
    await delay(600);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTransactions = mockTransactions.slice(startIndex, endIndex);
    
    return {
      status: 'success',
      data: {
        transactions: paginatedTransactions,
        total: mockTransactions.length
      }
    };
  },

  async getFilteredTransactions(filters: any): Promise<ApiResponse<Transaction[]>> {
    await delay(400);
    

    const convertDateToISO = (dateStr: string): string => {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    };
    

    let filteredTransactions = [...mockTransactions];
    
    if (filters.status) {
      filteredTransactions = filteredTransactions.filter(t => t.status === filters.status);
    }
    
    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
    }
    

    if (filters.accountFilter && filters.accountFilter !== 'All Accounts') {
      
      if (filters.accountFilter === 'Savings') {
        filteredTransactions = filteredTransactions.filter(t => t.amount > 50000);
      } else if (filters.accountFilter === 'Current') {
        filteredTransactions = filteredTransactions.filter(t => t.amount <= 50000);
      }
    }
    

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      if (start || end) {
        filteredTransactions = filteredTransactions.filter(transaction => {
          const transactionDate = convertDateToISO(transaction.date);
          
          if (start && end) {
            return transactionDate >= start && transactionDate <= end;
          } else if (start) {
            return transactionDate >= start;
          } else if (end) {
            return transactionDate <= end;
          }
          
          return true;
        });
      }
    }
    
    return {
      status: 'success',
      data: filteredTransactions
    };
  }
}; 