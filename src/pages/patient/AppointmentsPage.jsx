import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppointmentCard } from '../../features/patient/components/AppointmentCard';
import {
  APPOINTMENT_STATUS,
  getAppointments,
} from '../../features/patient/appointmentsStorage';

const FILTERS = [
  { id: 'All', label: 'All' },
  { id: APPOINTMENT_STATUS.PENDING, label: 'Pending' },
  { id: APPOINTMENT_STATUS.CONFIRMED, label: 'Confirmed' },
  { id: APPOINTMENT_STATUS.REJECTED, label: 'Rejected' },
];

export function AppointmentsPage() {
  const appointments = getAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'All') {
      return appointments;
    }

    return appointments.filter(
      (appointment) => appointment.status === activeFilter
    );
  }, [appointments, activeFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>

          <p className="mt-2 text-slate-600">
            Manage your appointment requests and review outcomes.
          </p>
        </div>

        <Link
          to="/patient/hospitals"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Book Appointment
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:bg-teal-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {appointments.length === 0
              ? 'No appointments yet'
              : 'No appointments match this filter'}
          </h2>
          <p className="mt-2 text-slate-600">
            {appointments.length === 0
              ? 'Start by choosing a hospital and requesting your first appointment.'
              : 'Try another filter or book a new appointment.'}
          </p>
          <Link
            to="/patient/hospitals"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-teal-700"
          >
            Book Appointment
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onViewDetails={setSelectedAppointment}
            />
          ))}
        </div>
      )}

      {selectedAppointment ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold">Appointment Details</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                <strong>Doctor:</strong> {selectedAppointment.doctorName}
              </p>

              <p>
                <strong>Hospital:</strong>{' '}
                {selectedAppointment.hospitalName ||
                  selectedAppointment.hospital}
              </p>

              <p>
                <strong>Date:</strong> {selectedAppointment.date}
              </p>

              <p>
                <strong>Time:</strong> {selectedAppointment.time}
              </p>

              <p>
                <strong>Reason:</strong> {selectedAppointment.reason}
              </p>

              <p>
                <strong>Status:</strong> {selectedAppointment.status}
              </p>

              {selectedAppointment.createdAt ? (
                <p>
                  <strong>Requested:</strong>{' '}
                  {new Date(selectedAppointment.createdAt).toLocaleString()}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setSelectedAppointment(null)}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AppointmentsPage;
