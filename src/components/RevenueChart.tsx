import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TimeRange, RevenueData } from '../types';
import { ChartSkeleton } from './SkeletonLoader';
import { ChevronDown } from 'lucide-react';

interface RevenueChartProps {
  data: RevenueData[];
  loading: boolean;
  currentRevenue: number;
  previousRevenue: number;
  percentage: number;
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const timeRanges: TimeRange[] = ['Today', 'Last 7 days', 'Last 30 days'];

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  loading,
  currentRevenue,
  percentage,
  selectedTimeRange,
  onTimeRangeChange,
}) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6"
    >

      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:hidden relative"
        >
          <select
            value={selectedTimeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
          >
            {timeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex gap-2"
        >
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                selectedTimeRange === range
                  ? 'text-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedTimeRange === range ? { backgroundColor: '#00C6FB0F' } : {}}
            >
              {range}
            </button>
          ))}
        </motion.div>
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="hidden md:flex items-center gap-4 mb-6"
      >
        <span className="text-sm text-gray-600">Showing data for</span>
        <div className="relative">
          <select
            value={selectedTimeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
          >
            {timeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        
        <div className="hidden md:block">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-gray-600">Revenue</span>
            <span className="text-sm text-green-600">
              {percentage > 0 ? '+' : ''}{percentage}%
            </span>
            <span className="text-sm text-gray-500">vs Last 7 days</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            ₦{currentRevenue.toLocaleString()}.00
          </div>
          <p className="text-sm text-gray-500 mt-1">in total value</p>
        </div>

        
        <div className="md:hidden">
          <div className="text-3xl font-bold text-gray-900">
            ₦{currentRevenue.toLocaleString()}.00
          </div>
          <p className="text-sm text-gray-500 mt-1">in total value</p>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="h-72"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Bar
              dataKey="value"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
              animationBegin={500}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}; 