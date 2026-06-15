import { Calendar, Clock, MapPin, User } from 'lucide-react';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-green-100 text-green-700 border-green-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
  'Reschedule Requested': 'bg-blue-100 text-blue-700 border-blue-200',
};

export function AppointmentCard({ appointment, onViewDetails }) {
  const hospitalLabel =
    appointment.hospitalName || appointment.hospital || 'Hospital not specified';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            {appointment.doctorName}
          </h3>

          {appointment.patientName ? (
            <p className="text-sm text-slate-500">
              Patient: {appointment.patientName}
            </p>
          ) : null}
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            statusColors[appointment.status] ||
            'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {appointment.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          {appointment.time}
        </div>

        <div className="flex items-center gap-2">
          <User size={16} />
          {appointment.reason}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {hospitalLabel}
        </div>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => onViewDetails(appointment)}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-teal-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
