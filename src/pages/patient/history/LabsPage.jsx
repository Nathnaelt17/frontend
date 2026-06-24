import React from 'react';
import { useTimelineSearch } from '../../../context/TimelineSearchContext';

export default function LabsPage() {
  const { search, activeType } = useTimelineSearch();
  const labs = [
    { id: 1, title: 'CBC', summary: 'Complete blood count results', date: '2023-05-01' },
    { id: 2, title: 'Lipid Panel', summary: 'Cholesterol and triglycerides', date: '2023-06-12' },
  ];
  const filtered = labs.filter(lab => {
    const q = search.trim().toLowerCase();
    if (q && !(lab.title.toLowerCase().includes(q) || lab.summary.toLowerCase().includes(q))) {
      return false;
    }
    if (activeType !== 'All' && activeType !== 'Lab' && activeType !== 'lab') {
      return false;
    }
    return true;
  });
  return (
    <div className="space-y-6">
      {/* Subheader */}
      <h2 className="text-2xl font-bold mb-4">Lab Results</h2>
      <div className="grid gap-4">
        {filtered.map(lab => (
          <div key={lab.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{lab.title}</h3>
            <p className="text-sm text-gray-600">{lab.summary}</p>
            <p className="text-xs text-gray-400 mt-1">{lab.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
