import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  rounded = 'md'
}) => {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`skeleton ${width} ${height} ${roundedClass[rounded]} ${className}`}
    />
  );
};


export const CardSkeleton: React.FC = () => (
  <div className="card p-6 animate-fade-in">
    <SkeletonLoader height="h-6" width="w-1/3" className="mb-4" />
    <SkeletonLoader height="h-4" width="w-2/3" className="mb-2" />
    <SkeletonLoader height="h-4" width="w-1/2" />
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <div className="card p-6 animate-fade-in">
    <div className="flex justify-between items-center mb-6">
      <SkeletonLoader height="h-6" width="w-24" />
      <SkeletonLoader height="h-8" width="w-32" />
    </div>
    <SkeletonLoader height="h-4" width="w-1/4" className="mb-2" />
    <SkeletonLoader height="h-8" width="w-1/3" className="mb-6" />
    <div className="flex items-end gap-2 h-48">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonLoader
          key={i}
          width="flex-1"
          height={`h-${Math.floor(Math.random() * 32) + 16}`}
          className="rounded-t-md"
        />
      ))}
    </div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="card overflow-hidden animate-fade-in">
    <div className="p-6 border-b">
      <div className="flex justify-between items-center mb-4">
        <SkeletonLoader height="h-6" width="w-32" />
        <SkeletonLoader height="h-8" width="w-24" />
      </div>
      <div className="flex gap-4">
        <SkeletonLoader height="h-8" width="w-40" />
        <SkeletonLoader height="h-8" width="w-48" />
      </div>
    </div>
    <div className="divide-y">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SkeletonLoader height="h-4" width="w-4" />
            <SkeletonLoader height="h-4" width="w-16" />
            <SkeletonLoader height="h-4" width="w-20" />
            <SkeletonLoader height="h-4" width="w-16" />
          </div>
          <SkeletonLoader height="h-6" width="w-20" rounded="full" />
        </div>
      ))}
    </div>
  </div>
); 