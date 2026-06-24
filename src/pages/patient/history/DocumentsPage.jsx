// src/pages/patient/history/DocumentsPage.jsx
import React from 'react';
import { useTimelineSearch } from '../../../context/TimelineSearchContext';

export default function DocumentsPage() {
  const { searchTerm, filters } = useTimelineSearch();
  const activeType = filters?.type || 'All';

  const documents = [
    { id: 1, title: 'Prescription - 2023-04-10', date: '2023-04-10' },
    { id: 2, title: 'Lab Report - CBC', date: '2023-05-01' },
  ];

  const filtered = documents.filter(doc => {
    const matchesSearch = searchTerm
      ? doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesType = activeType === 'All' || activeType === 'Document' ? true : false;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      <div className="grid gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
            <p className="text-xs text-gray-500">{doc.date}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No documents match your search.</p>
        )}
      </div>
    </div>
  );
}
