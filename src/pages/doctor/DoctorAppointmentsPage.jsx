import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../app/providers/AuthContext';
import { getAppointmentsByDoctor } from '../../api/appointments.api';
import ErrorAlert from '../../components/shared/ErrorAlert';
import EmptyState from '../../components/shared/EmptyState';
import { CalendarX } from 'lucide-react';

const APPOINTMENT_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  REJECTED: 'Rejected',
  RESCHEDULE_REQUESTED: 'Reschedule Requested',
};

export function DoctorAppointmentsPage() {
  const { doctorId } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pendingAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => appointment.status === APPOINTMENT_STATUS.PENDING
    );
  }, [appointments]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!doctorId) {
        if (mounted) {
          setError('Missing doctor identity.');
          setAppointments([]);
          setLoading(false);
        }
        return;
      }
      try {
        setLoading(true);
        setError('');
        const data = await getAppointmentsByDoctor(doctorId);
        if (mounted) setAppointments(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (mounted) setError(loadError?.message || 'Failed to load appointments.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [doctorId]);

  const handleStatusUpdate = async (id, status) => {
    // For now, we can only cancel appointments via the backend API
    // Status updates would require a backend endpoint for updating appointment status
    console.warn('Status update not yet implemented for status:', status);
    // Reload appointments
    try {
      setLoading(true);
      setError('');
      const data = await getAppointmentsByDoctor(doctorId);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (loadError) {
      setError(loadError?.message || 'Failed to reload appointments.');
    } finally {
      setLoading(false);
    }
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

      {error && (
        <ErrorAlert
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {loading ? (
        <div className="flex justify-center rounded-xl border bg-white py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-teal-600" />
        </div>
      ) : pendingAppointments.length === 0 ? (
        <EmptyState
          title="No pending requests"
          description="New patient appointment requests will appear here for review."
          icon={CalendarX}
        />
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
