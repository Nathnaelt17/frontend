import {
  Activity,
  Building2,
  CalendarDays,
  FileText,
  Pill,
  AlertTriangle
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { PatientDashboardWidget } from '../../features/patient/components/PatientDashboardWidget';

import {
  patientHealthSnapshot,
  patientRecentMedicalActivity,
  patientUpcomingAppointments
} from '../../features/patient/mockPatientDashboard';

export function PatientDashboardPage() {
  const nextAppointment = patientUpcomingAppointments?.[0];

  const vitals = [
    {
      label: 'Blood Pressure',
      value: '118 / 78',
      status: 'Normal'
    },
    {
      label: 'Blood Sugar',
      value: '95 mg/dL',
      status: 'Normal'
    },
    {
      label: 'Weight',
      value: '72 kg',
      status: 'Stable'
    }
  ];

  const quickActions = [
    {
      label: 'Medical Records',
      to: '/patient/medicalhistorypage',
      icon: FileText
    },
    {
      label: 'Appointments',
      to: '/patient/appointments',
      icon: CalendarDays
    },
    {
      label: 'Medications',
      to: '/patient/prescriptions',
      icon: Pill
    },
    {
      label: 'Hospitals',
      to: '/patient/hospitals',
      icon: Building2
    }
  ];

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-teal-100">
              Patient Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Good Morning
            </h1>

            <p className="mt-3 max-w-2xl text-teal-50">
              Here's your healthcare summary for today.
              Stay on top of appointments, records,
              medications and your overall wellness.
            </p>
          </div>

          <Link
            to="/patient/book-appointment"
            className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-teal-700 transition hover:bg-slate-100"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* UPCOMING APPOINTMENT */}
      {nextAppointment && (
        <PatientDashboardWidget
          title="Upcoming Appointment"
          description="Your next scheduled healthcare visit."
        >
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {nextAppointment.title}
                </h3>

                <p className="mt-2 text-slate-600">
                  {nextAppointment.when}
                </p>

                <p className="text-slate-600">
                  {nextAppointment.location}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-blue-700 shadow">
                  {nextAppointment.status}
                </span>

                <Link
                  to="/patient/appointments"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </PatientDashboardWidget>
      )}

      {/* HEALTH SNAPSHOT */}
      <PatientDashboardWidget
        title="Health Snapshot"
        description="Key health indicators at a glance."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {vitals.map((vital) => (
            <div
              key={vital.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-500">
                {vital.label}
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {vital.value}
              </p>

              <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {vital.status}
              </span>
            </div>
          ))}
        </div>
      </PatientDashboardWidget>

      {/* QUICK ACTIONS */}
      <PatientDashboardWidget
        title="Quick Actions"
        description="Access your most-used healthcare tools."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-teal-200 hover:bg-white"
            >
              <Icon className="h-8 w-8 text-teal-700" />

              <span className="text-center text-sm font-semibold text-slate-900">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </PatientDashboardWidget>

      {/* RECENT ACTIVITY */}
      <PatientDashboardWidget
        title="Recent Activity"
        description="Your latest healthcare updates."
      >
        <div className="space-y-3">
          {patientRecentMedicalActivity
            .slice(0, 5)
            .map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {event.type}
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {event.title}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
                    {new Date(
                      event.occurredAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {event.summary}
                </p>
              </article>
            ))}
        </div>
      </PatientDashboardWidget>

      {/* HEALTH ALERTS */}
      <PatientDashboardWidget
        title="Health Alerts"
        description="Important reminders and recommendations."
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />

            <div>
              <p className="font-semibold text-slate-900">
                Annual Checkup Recommended
              </p>

              <p className="text-sm text-slate-600">
                It has been more than 12 months since your
                last general wellness visit.
              </p>
            </div>
          </div>

          {patientHealthSnapshot?.activeConditions?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                Active Conditions
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {patientHealthSnapshot.activeConditions.map(
                  (condition) => (
                    <li
                      key={condition}
                      className="flex items-center gap-2"
                    >
                      <Activity className="h-4 w-4 text-teal-700" />
                      {condition}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </PatientDashboardWidget>

    </div>
  );
}

export default PatientDashboardPage;