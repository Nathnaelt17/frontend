import { getDoctorPatientSummary } from '../mockPatientSummaries';
import { doctorPatients } from '../mockPatients';
export function PatientContextBanner({
  patientId
}) {
  const summary = patientId ? getDoctorPatientSummary(patientId) : null;
  const fallback = patientId ? doctorPatients.find(item => item.id === patientId) : null;
  const patient = summary ? {
    patientId: summary.patientId,
    name: summary.name,
    age: summary.age,
    gender: summary.gender
  } : fallback ? {
    patientId: fallback.id,
    name: fallback.name,
    age: fallback.age,
    gender: fallback.gender
  } : null;
  if (!patient) {
    return null;
  }
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Patient Context</p><div className="mt-3 grid gap-3 md:grid-cols-4"><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Patient Name</p><p className="mt-1 text-base font-semibold text-slate-900">{patient.name}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Patient ID</p><p className="mt-1 text-base font-semibold text-slate-900">{patient.patientId}</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Age</p><p className="mt-1 text-base font-semibold text-slate-900">{patient.age} yrs</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Gender</p><p className="mt-1 text-base font-semibold text-slate-900">{patient.gender}</p></div></div></section>;
}
