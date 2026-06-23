import React from 'react';

export default function EmptyState({ 
  title = "No database records found", 
  description = "The connection is live and healthy, but this view is currently a blank slate.", 
  actionText = "Add New Record", 
  onAction 
}) {
  return (
    <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 my-4">
      <div className="text-4xl mb-3" role="img" aria-label="folder">📁</div>
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-emerald-700 transition-colors"
        >
          <span>+</span> {actionText}
        </button>
      )}
    </div>
  );
}