
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
      <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Generating your masterpiece...</p>
    </div>
  );
};
