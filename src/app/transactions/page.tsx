'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { TransactionTable } from '../../components/TransactionTable';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  fetchTransactions, 
  filterTransactions,
  setCurrentPage, 
  setAccountFilter, 
  setDateRange 
} from '../../store/transactionsSlice';
import { TransactionFilter } from '../../types';

export default function Transactions() {
  const dispatch = useAppDispatch();
  const {
    transactions,
    loading,
    currentPage,
    totalPages,
    selectedAccountFilter,
    dateRange,
  } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions({ page: currentPage, limit: 8 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleAccountFilterChange = (filter: TransactionFilter) => {
    dispatch(setAccountFilter(filter));
    dispatch(setCurrentPage(1));
    dispatch(filterTransactions({ 
      accountFilter: filter,
      dateRange: dateRange
    }));
  };

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    dispatch(setDateRange(range));
    dispatch(setCurrentPage(1));
    dispatch(filterTransactions({ 
      accountFilter: selectedAccountFilter,
      dateRange: range
    }));
  };

  const handleExport = () => {
    console.log('Exporting transactions...');
    const csvContent = [
      ['Amount', 'Transaction ID', 'Type', 'Date', 'Time', 'Status'],
      ...transactions.map(t => [
        t.amount.toString(),
        t.transactionId,
        t.type,
        t.date,
        t.time,
        t.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
          </motion.div>
        </div>

        <TransactionTable
          transactions={transactions}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedAccountFilter={selectedAccountFilter}
          dateRange={dateRange}
          onPageChange={handlePageChange}
          onAccountFilterChange={handleAccountFilterChange}
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
        />
      </motion.div>
    </Layout>
  );
} 