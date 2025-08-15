import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { AccountDetails } from '../types';
import { CardSkeleton } from './SkeletonLoader';

interface AccountCardProps {
  accountDetails: AccountDetails | null;
  loading: boolean;
}

export const AccountCard: React.FC<AccountCardProps> = ({ accountDetails, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (accountDetails?.accountNumber) {
      try {
        await navigator.clipboard.writeText(accountDetails.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  if (loading) {
    return <CardSkeleton />;
  }

  if (!accountDetails) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card w-full md:w-[325px] md:h-[115px] p-6 md:p-4"
      style={{
        gap: '10px'
      }}
    >



      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-full"
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1 md:mb-0.5">ACCOUNT DETAILS</p>
            <p className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-1">{accountDetails.bankName}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              {accountDetails.accountNumber}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 bg-purple-100 text-purple-700 rounded-lg text-xs md:text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 