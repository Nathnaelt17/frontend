import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Activity, FileText, FileStack } from 'lucide-react';
import TimelineSearchBar from '../../features/timeline/components/TimelineSearchBar';
import TimelineFilterBar from '../../features/timeline/components/TimelineFilterBar';
import { TimelineSearchProvider, useTimelineSearch } from '../../context/TimelineSearchContext';

const tabs = [
  { to: '/patient/history/overview', label: 'Overview', icon: User },
  { to: '/patient/history/timeline', label: 'Timeline', icon: Activity },
  { to: '/patient/history/labs', label: 'Lab Results', icon: FileText },
  { to: '/patient/history/documents', label: 'Documents', icon: FileStack },
];

export function MedicalHistoryLayout() {
  return (
    <TimelineSearchProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Medical History</h1>
              <p className="text-sm text-white/80">Complete clinical record</p>
            </div>
          </div>
        </div>

        {/* Nav pills */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                }`
              }
            >
              {(() => {
                const Icon = t.icon;
                return <Icon size={16} className="mr-1 inline" />;
              })()}
              {t.label}
            </NavLink>
          ))}
        </div>

        {/* Shared search and filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TimelineSearchBar />
          <TimelineFilterBar />
        </div>

        {/* Nested route outlet */}
        <Outlet />
      </div>
    </TimelineSearchProvider>
  );
}
