import React from 'react';

export default function DocumentsPage() {
  // Placeholder document list – replace with real data later
  const documents = [
    { id: 1, title: 'Prescription - 2023-04-10', date: '2023-04-10' },
    { id: 2, title: 'Lab Report - CBC', date: '2023-05-01' },
  ];

  return (
    <div className="space-y-6">

  {/* Subheader */}
  <h2 className="text-2xl font-bold mb-4">Documents</h2>

      {/* Documents list */}
      <div className="grid gap-4">
        {documents.map(doc => (
          <div key={doc.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
            <p className="text-xs text-gray-500">{doc.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

