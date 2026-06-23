import { useMemo, useState } from 'react';
import { Pill, CalendarDays, User, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';
import {
  getPatientPrescriptions,
  PRESCRIPTION_STATUS
} from '../../features/patient/prescriptionsStorage';

const FILTERS = [
  { id: 'ALL', label: 'All' },
  { id: PRESCRIPTION_STATUS.ACTIVE, label: 'Active' },
  { id: PRESCRIPTION_STATUS.COMPLETED, label: 'Completed' },
  { id: PRESCRIPTION_STATUS.CANCELLED, label: 'Cancelled' }
];

export function PrescriptionsPage() {
  const { user } = useAuth();

  const patientId = user?.id || '1';

  const [filter, setFilter] = useState('ALL');

  const prescriptions = getPatientPrescriptions(patientId);

  const filteredPrescriptions = useMemo(() => {
    if (filter === 'ALL') {
      return prescriptions;
    }

    return prescriptions.filter(
      (prescription) => prescription.status === filter
    );
  }, [prescriptions, filter]);

  const getStatusStyles = (status) => {
    switch (status) {
      case PRESCRIPTION_STATUS.ACTIVE:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';

      case PRESCRIPTION_STATUS.COMPLETED:
        return 'bg-blue-100 text-blue-700 border-blue-200';

      case PRESCRIPTION_STATUS.CANCELLED:
        return 'bg-red-100 text-red-700 border-red-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-teal-100">
              Medication Management
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Prescriptions
            </h1>

            <p className="mt-3 max-w-2xl text-teal-50">
              View active medications and prescription history.
              Stay on top of your treatment plan and medication schedule.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-sm">
            <Pill className="h-6 w-6 text-teal-100" />
            <span className="font-semibold text-white">
              {prescriptions.length} Total
            </span>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              filter === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* PRESCRIPTION LIST */}
      {filteredPrescriptions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Pill size={40} className="text-slate-300" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No prescriptions found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Prescriptions issued by your doctor will appear here.
            Check back after your next appointment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* HEADER */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3">
                    <Pill className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {prescription.medication}
                    </h2>
                    <p className="text-sm text-slate-500">
                      #{prescription.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${getStatusStyles(
                    prescription.status
                  )}`}
                >
                  {prescription.status}
                </span>
              </div>

              {/* DETAILS GRID */}
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <InfoRow
                  icon={Pill}
                  label="Dosage"
                  value={prescription.dosage}
                />
                <InfoRow
                  icon={Clock}
                  label="Frequency"
                  value={prescription.frequency}
                />
                <InfoRow
                  icon={CalendarDays}
                  label="Duration"
                  value={prescription.duration}
                />
                <InfoRow
                  icon={User}
                  label="Prescribed By"
                  value={prescription.prescribedBy}
                />
                <InfoRow
                  icon={CalendarDays}
                  label="Date"
                  value={prescription.prescribedDate}
                />
              </div>

              {/* INSTRUCTIONS */}
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Instructions
                    </p>
                    <p className="mt-1 text-slate-600">
                      {prescription.instructions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-slate-400" />
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default PrescriptionsPage;