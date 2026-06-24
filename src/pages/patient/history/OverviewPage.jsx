import React from 'react';
import { useTimelineSearch } from '../../../context/TimelineSearchContext';

export default function OverviewPage() {
  const { search, activeType } = useTimelineSearch();
  // Placeholder patient data – replace with real data source later
  const userProfile = {
    full_name: 'Patient Name',
    fayda_id: 'XXXXXX',
    blood_type: 'N/A',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="text-sm mb-2">Search: {search || '(none)'}</div>
      <div className="text-sm mb-2">Filter: {activeType}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 font-semibold">Patient Information</h3>
          <p className="text-sm">{userProfile.full_name}</p>
          <p className="text-sm">Blood Type: {userProfile.blood_type}</p>
          <p className="text-sm">Fayda ID: {userProfile.fayda_id}</p>
        </div>
      </div>
    </div>
  );
}
