import React from 'react';

export function LoadingScreen({ message = "Connecting to TenaLink Pipeline..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-100 border-t-cyan-600"></div>
      <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">{message}</p>
    </div>
  );
}