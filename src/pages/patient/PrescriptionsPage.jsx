import { useMemo, useState } from 'react';
import { Pill } from 'lucide-react';
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
        return 'bg-green-100 text-green-800 border-green-200';

      case PRESCRIPTION_STATUS.COMPLETED:
        return 'bg-blue-100 text-blue-800 border-blue-200';

      case PRESCRIPTION_STATUS.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Prescriptions
        </h1>

        <p className="mt-2 text-slate-600">
          View active medications and prescription history.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === item.id
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredPrescriptions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <Pill
            size={48}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No prescriptions found
          </h2>

          <p className="mt-2 text-slate-600">
            Prescriptions issued by your doctor
            will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {prescription.medication}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {prescription.id}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
                    prescription.status
                  )}`}
                >
                  {prescription.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InfoRow
                  label="Dosage"
                  value={prescription.dosage}
                />

                <InfoRow
                  label="Frequency"
                  value={prescription.frequency}
                />

                <InfoRow
                  label="Duration"
                  value={prescription.duration}
                />

                <InfoRow
                  label="Prescribed By"
                  value={prescription.prescribedBy}
                />

                <InfoRow
                  label="Date"
                  value={prescription.prescribedDate}
                />
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  Instructions
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {prescription.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default PrescriptionsPage;