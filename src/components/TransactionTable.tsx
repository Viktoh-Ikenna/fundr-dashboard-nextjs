import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Calendar, ChevronDown } from 'lucide-react';
import { Transaction, TransactionFilter } from '../types';
import { TableSkeleton } from './SkeletonLoader';
import { MobileTransactionCard } from './MobileTransactionCard';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  selectedAccountFilter: TransactionFilter;
  dateRange: { start: string; end: string };
  onPageChange: (page: number) => void;
  onAccountFilterChange: (filter: TransactionFilter) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onExport: () => void;
}

const accountFilters: TransactionFilter[] = ['All Accounts', 'Savings', 'Current'];

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap";
  
  switch (status) {
    case 'Processed':
      return `${baseClasses} bg-green-50 text-green-600 border border-green-200`;
    case 'Failed':
      return `${baseClasses} bg-red-50 text-red-600 border border-red-200`;
    case 'Pending':
      return `${baseClasses} bg-yellow-50 text-yellow-600 border border-yellow-200`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-700`;
  }
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  currentPage,
  totalPages,
  selectedAccountFilter,
  dateRange,
  onPageChange,
  onAccountFilterChange,
  onDateRangeChange,
  onExport,
}) => {
  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >

      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </motion.button>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >

          <div className="relative">
            <select
              value={selectedAccountFilter}
              onChange={(e) => onAccountFilterChange(e.target.value as TransactionFilter)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[140px]"
            >
              {accountFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>


          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <Calendar size={16} className="text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                className="text-sm text-gray-700 border-none outline-none bg-transparent"
                placeholder="Start date"
              />
            </div>
            <span className="text-gray-400">to</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <Calendar size={16} className="text-gray-400" />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                className="text-sm text-gray-700 border-none outline-none bg-transparent"
                placeholder="End date"
              />
            </div>
          </div>
        </motion.div>
      </div>


      <div className="md:hidden space-y-4 p-4">
        {transactions.map((transaction, index) => (
          <MobileTransactionCard
            key={transaction.id}
            transaction={transaction}
            index={index}
          />
        ))}
      </div>


      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 px-6 py-4 text-left">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TRANSACTION ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TRANSACTION TYPE
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TIME
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  ₦{transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {transaction.transactionId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {transaction.time}
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(transaction.status)}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      transaction.status === 'Processed' ? 'bg-green-500' :
                      transaction.status === 'Failed' ? 'bg-red-500' :
                      transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></span>
                    {transaction.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 6 of 20 results
          </p>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                currentPage === 1
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              1
            </button>
            
            <button
              onClick={() => onPageChange(2)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                currentPage === 2
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              2
            </button>
            
            <span className="px-2 text-gray-400 text-sm">...</span>
            
            <button
              onClick={() => onPageChange(9)}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
            >
              9
            </button>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 