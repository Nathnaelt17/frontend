import { Link } from 'react-router-dom';

import { mockHospitals } from '../../features/patient/mockHospitals';

export function HospitalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/patient/appointments"
          className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
        >
          Back to Appointments
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">Hospitals</h1>

        <p className="mt-2 text-slate-600">
          Select a hospital to view available doctors and book an appointment.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {hospital.name}
            </h2>

            <p className="mt-2 text-sm text-slate-600">{hospital.city}</p>

            <p className="mt-2 text-sm text-slate-600">{hospital.specialty}</p>

            <p className="mt-2 text-sm text-slate-500">
              {hospital.doctors} Doctors Available
            </p>

            <Link
              to={`/patient/doctors?hospital=${hospital.id}`}
              className="mt-4 inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-teal-700"
            >
              View Doctors
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HospitalsPage;
