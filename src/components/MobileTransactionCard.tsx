import React from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';

interface MobileTransactionCardProps {
  transaction: Transaction;
  index: number;
}

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

export const MobileTransactionCard: React.FC<MobileTransactionCardProps> = ({
  transaction,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">AMOUNT</p>
          <p className="text-lg font-bold text-gray-900">₦{transaction.amount.toLocaleString()}</p>
        </div>
        <span className={getStatusBadge(transaction.status)}>
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            transaction.status === 'Processed' ? 'bg-green-500' :
            transaction.status === 'Failed' ? 'bg-red-500' :
            transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-500'
          }`}></span>
          {transaction.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">TRANSACTION TYPE</p>
          <p className="font-medium text-gray-900">{transaction.type}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">TRANSACTION ID</p>
          <p className="font-medium text-gray-700">{transaction.transactionId}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">DATE</p>
          <p className="font-medium text-gray-700">{transaction.date}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">TIME</p>
          <p className="font-medium text-gray-700">{transaction.time}</p>
        </div>
      </div>
    </motion.div>
  );
}; 