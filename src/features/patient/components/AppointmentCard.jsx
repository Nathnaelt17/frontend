import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Circle
} from 'lucide-react';

const statusStyles = {
  Pending: {
    badge:
      'bg-yellow-100 text-yellow-800 border-yellow-200',
    border: 'border-l-yellow-500'
  },

  Confirmed: {
    badge:
      'bg-green-100 text-green-700 border-green-200',
    border: 'border-l-green-500'
  },

  Rejected: {
    badge:
      'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-500'
  },

  'Reschedule Requested': {
    badge:
      'bg-blue-100 text-blue-700 border-blue-200',
    border: 'border-l-blue-500'
  }
};

function AppointmentProgress({ status }) {
  if (status === 'Rejected') {
    return (
      <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
        Appointment request was rejected.
      </div>
    );
  }

  const confirmed = status === 'Confirmed';

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Requested</span>
        <span>Confirmed</span>
        <span>Visit Day</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <CheckCircle2
          size={20}
          className="text-green-600"
        />

        <div className="mx-2 h-[2px] flex-1 bg-slate-200">
          <div
            className={`h-full ${
              confirmed
                ? 'w-full bg-green-500'
                : 'w-1/2 bg-yellow-500'
            }`}
          />
        </div>

        {confirmed ? (
          <CheckCircle2
            size={20}
            className="text-green-600"
          />
        ) : (
          <Circle
            size={20}
            className="text-slate-300"
          />
        )}

        <div className="mx-2 h-[2px] flex-1 bg-slate-200" />

        <Circle
          size={20}
          className="text-slate-300"
        />
      </div>
    </div>
  );
}

export function AppointmentCard({
  appointment,
  onViewDetails
}) {
  const hospitalLabel =
    appointment.hospitalName ||
    appointment.hospital ||
    'Hospital not specified';

  const style =
    statusStyles[appointment.status] || {
      badge:
        'bg-slate-100 text-slate-700 border-slate-200',
      border: 'border-l-slate-400'
    };

  return (
    <div
      className={`rounded-2xl border border-slate-200 border-l-4 ${style.border} bg-white p-6 shadow-sm transition hover:shadow-md`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {appointment.doctorName}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {appointment.specialty ||
              'General Consultation'}
          </p>

          {appointment.patientName ? (
            <p className="mt-1 text-xs text-slate-400">
              Patient: {appointment.patientName}
            </p>
          ) : null}
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          {appointment.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <Calendar
            size={16}
            className="text-blue-600"
          />

          <span>{appointment.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock
            size={16}
            className="text-blue-600"
          />

          <span>{appointment.time}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={16}
            className="text-blue-600"
          />

          <span>{hospitalLabel}</span>
        </div>

        <div className="flex items-start gap-3">
          <User
            size={16}
            className="mt-0.5 text-blue-600"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Reason
            </p>

            <p>{appointment.reason}</p>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <AppointmentProgress
        status={appointment.status}
      />

      {/* ACTIONS */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() =>
            onViewDetails(appointment)
          }
          className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </button>

        {appointment.status ===
          'Confirmed' && (
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Prepare
          </button>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;