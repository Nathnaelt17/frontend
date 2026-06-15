import { useState } from 'react';

import {
  APPOINTMENT_STATUS,
  getPendingAppointments,
  updateAppointmentStatus,
} from '../../features/patient/appointmentsStorage';

export function DoctorAppointmentsPage() {
  const [pendingAppointments, setPendingAppointments] = useState(() =>
    getPendingAppointments()
  );

  const loadAppointments = () => {
    setPendingAppointments(getPendingAppointments());
  };

  const handleStatusUpdate = (id, status) => {
    updateAppointmentStatus(id, status);
    loadAppointments();
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Doctor Workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Appointment Requests</h1>
        <p className="text-slate-600">
          Review pending appointment requests and respond to patients.
        </p>
      </header>

      {pendingAppointments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No pending requests
          </h2>
          <p className="mt-2 text-slate-600">
            New patient appointment requests will appear here for review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingAppointments.map((appointment) => (
            <article
              key={appointment.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {appointment.id}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    {appointment.patientName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>

                <span className="rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  {appointment.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-700">
                <strong>Reason:</strong> {appointment.reason}
              </p>

              {appointment.hospitalName ? (
                <p className="mt-2 text-sm text-slate-600">
                  <strong>Hospital:</strong> {appointment.hospitalName}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(
                      appointment.id,
                      APPOINTMENT_STATUS.CONFIRMED
                    )
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(
                      appointment.id,
                      APPOINTMENT_STATUS.REJECTED
                    )
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(
                      appointment.id,
                      APPOINTMENT_STATUS.RESCHEDULE_REQUESTED
                    )
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Request Reschedule
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
