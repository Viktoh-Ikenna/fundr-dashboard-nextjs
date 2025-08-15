'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevenueChart } from '../../components/RevenueChart';
import { AccountCard } from '../../components/AccountCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDashboardStats, setTimeRange } from '../../store/dashboardSlice';
import { TimeRange } from '../../types';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { stats, loading, selectedTimeRange } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats(selectedTimeRange));
  }, [dispatch, selectedTimeRange]);

  const handleTimeRangeChange = (range: TimeRange) => {
    dispatch(setTimeRange(range));
    dispatch(fetchDashboardStats(range));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <nav className="flex space-x-8 border-b border-gray-200 pb-4">
          <button className="relative py-2 px-1 text-blue-600 border-b-2 border-blue-600 font-medium text-sm">
            Online Payments
          </button>
        </nav>
      </motion.div>

      <AccountCard
        accountDetails={stats?.accountDetails || null}
        loading={loading}
      />
       
      <RevenueChart
        data={stats?.revenue.data || []}
        loading={loading}
        currentRevenue={stats?.revenue.current || 0}
        previousRevenue={stats?.revenue.previous || 0}
        percentage={stats?.revenue.percentage || 0}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />
    </motion.div>
  );
} 