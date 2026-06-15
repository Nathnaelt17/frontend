import { useMemo, useState } from 'react';
import { PatientResultCard } from '../../features/doctor/components/PatientResultCard';
import { PatientSearchFilters } from '../../features/doctor/components/PatientSearchFilters';
import { doctorPatients, hospitalOptions, statusOptions } from '../../features/doctor/mockPatients';
export function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedPatient] = useState(null);
  const filteredPatients = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return doctorPatients.filter(patient => {
      const matchesSearch = !q || patient.name.toLowerCase().includes(q) || patient.id.toLowerCase().includes(q);
      const matchesHospital = hospitalFilter === 'All Hospitals' || patient.hospital === hospitalFilter;
      const matchesStatus = statusFilter === 'All Statuses' || patient.status === statusFilter;
      return matchesSearch && matchesHospital && matchesStatus;
    });
  }, [hospitalFilter, searchTerm, statusFilter]);
  return <div className="space-y-6"><PatientSearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} hospitalFilter={hospitalFilter} onHospitalFilterChange={setHospitalFilter} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} hospitals={hospitalOptions} statuses={statusOptions} resultsCount={filteredPatients.length} /><section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-4">{filteredPatients.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-sm">No patients match the current search. Try a different name, patient ID, hospital, or status.</div> : filteredPatients.map(patient => <PatientResultCard patient={patient} key={patient.id} />)}</div><aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Profile Snapshot</p>{selectedPatient ? <div className="mt-4 space-y-4 text-sm text-slate-700"><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Selected patient</p><h3 className="mt-1 text-xl font-semibold text-slate-950">{selectedPatient.name}</h3></div><dl className="grid gap-3"><div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Patient ID</dt><dd className="mt-1 font-semibold text-slate-900">{selectedPatient.id}</dd></div><div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Care status</dt><dd className="mt-1 font-semibold text-slate-900">{selectedPatient.status}</dd></div><div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs uppercase tracking-[0.18em] text-slate-400">Hospital</dt><dd className="mt-1 font-semibold text-slate-900">{selectedPatient.hospital}</dd></div></dl><p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-slate-700">Profile details are currently mocked for doctor review workflows. Use the timeline action to continue to the patient history view.</p></div> : <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">Select a patient card to preview a quick profile snapshot here.</div>}</aside></section></div>;
}
