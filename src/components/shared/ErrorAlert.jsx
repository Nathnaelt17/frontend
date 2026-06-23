import React from 'react';

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl my-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="text-xl" role="img" aria-label="warning">⚠️</span>
        <div>
          <h4 className="font-semibold text-sm text-red-900">Pipeline Synchronization Error</h4>
          <p className="text-xs text-red-700 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="text-xs font-semibold text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors shrink-0"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}