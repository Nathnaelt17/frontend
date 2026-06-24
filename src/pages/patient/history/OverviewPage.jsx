// src/pages/patient/history/OverviewPage.jsx
import React from 'react';
import { useTimelineSearch } from '../../../context/TimelineSearchContext';

export default function OverviewPage() {
  const { searchTerm, filters } = useTimelineSearch();
  const activeType = filters?.type || 'All';

  // Mock patient data – replace with real source later
  const patientInfo = {
    full_name: 'Patient Name',
    fayda_id: 'XXXXXX',
    blood_type: 'N/A',
  };

  // Determine if any patient field matches the search term (case‑insensitive)
  const matchesSearch = searchTerm
    ? Object.values(patientInfo).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : true;

  // Simple type filter – treat "All" as no filter for Overview
  const matchesType = activeType === 'All' || activeType === 'Overview';

  const shouldShow = matchesSearch && matchesType;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="text-sm mb-2">Search: {searchTerm || '(none)'}</div>
      <div className="text-sm mb-2">Filter: {activeType}</div>

      {shouldShow ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-3 font-semibold">Patient Information</h3>
            <p className="text-sm">{patientInfo.full_name}</p>
            <p className="text-sm">Blood Type: {patientInfo.blood_type}</p>
            <p className="text-sm">Fayda ID: {patientInfo.fayda_id}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No matching patient information found.</p>
      )}
    </div>
  );
}
