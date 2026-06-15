import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthContext';
import {
  addAppointment,
  APPOINTMENT_STATUS,
} from '../../features/patient/appointmentsStorage';
import { mockDoctors } from '../../features/patient/mockDoctors';
import { mockHospitals } from '../../features/patient/mockHospitals';

export function BookAppointmentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const doctorId = searchParams.get('doctor');
  const hospitalId = searchParams.get('hospital');

  const doctor = doctorId
    ? mockDoctors.find((d) => d.id === doctorId)
    : null;

  const hospital =
    hospitalId
      ? mockHospitals.find((h) => h.id === hospitalId)
      : doctor
        ? mockHospitals.find((h) => h.id === doctor.hospitalId)
        : null;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: `APT-${Date.now()}`,
      patientId: user?.id || 'patient-local',
      patientName: user?.name || 'Patient',
      doctorId: doctor.id,
      doctorName: doctor.name,
      hospitalId: hospital?.id || doctor.hospitalId,
      hospitalName: hospital?.name || 'Selected Hospital',
      date,
      time,
      reason,
      status: APPOINTMENT_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };

    addAppointment(newAppointment);
    navigate('/patient/appointments');
  };

  if (!doctor) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Book Appointment</h1>
          <p className="mt-2 text-slate-600">
            Select a doctor to request an appointment.
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No doctor selected
          </h2>
          <p className="mt-2 text-slate-600">
            Choose a hospital and doctor before requesting an appointment.
          </p>
          <Link
            to="/patient/hospitals"
            className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
          >
            Back to Hospitals
          </Link>
        </div>
      </div>
    );
  }

  const doctorsBackLink = hospital
    ? `/patient/doctors?hospital=${hospital.id}`
    : '/patient/hospitals';

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <Link
          to={doctorsBackLink}
          className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
        >
          Back to Doctors
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Book Appointment
        </h1>

        <p className="mt-2 text-slate-600">
          {doctor.name} • {doctor.specialty}
          {hospital ? ` • ${hospital.name}` : ''}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block font-medium" htmlFor="appointment-date">
            Appointment Date
          </label>

          <input
            id="appointment-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium" htmlFor="appointment-time">
            Appointment Time
          </label>

          <input
            id="appointment-time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium" htmlFor="appointment-reason">
            Reason for Visit
          </label>

          <textarea
            id="appointment-reason"
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <p className="text-sm text-slate-500">
          Your request will be sent to the doctor for approval. You will see a
          Pending status until it is reviewed.
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-teal-600 py-3 text-white hover:bg-teal-700"
        >
          Submit Appointment Request
        </button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;
