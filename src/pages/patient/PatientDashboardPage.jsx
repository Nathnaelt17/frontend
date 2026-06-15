import {
  Activity,
  Building2,
  CalendarDays,
  Pill,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { PatientDashboardWidget } from '../../features/patient/components/PatientDashboardWidget';
import {
  patientCurrentPrescriptions,
  patientHealthSnapshot,
  patientLastMedicalEvent,
  patientRecentMedicalActivity,
  patientUpcomingAppointments,
} from '../../features/patient/mockPatientDashboard';

export function PatientDashboardPage() {
  const quickActions = [
    { label: 'Find Hospitals', to: '/patient/hospitals', icon: Building2 },
    { label: 'View Appointments', to: '/patient/appointments', icon: CalendarDays },
    { label: 'View Timeline', to: '/patient/timeline', icon: Activity },
    { label: 'View Profile', to: '/patient/profile', icon: UserRound },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Patient Portal
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Patient dashboard</h1>
        <p className="text-slate-600">
          A mocked overview of your current health status, medications, appointments, and recent activity.
        </p>
      </header>

      {/* Top section */}
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PatientDashboardWidget
          title="Health Snapshot"
          description="A quick review of your current care status."
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">{patientHealthSnapshot.status}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {patientHealthSnapshot.welcome}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {patientHealthSnapshot.lastUpdated}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[].map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Active Conditions</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {patientHealthSnapshot.activeConditions.map((condition) => (
                  <li key={condition} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-teal-700" />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PatientDashboardWidget>

        {/* Prescriptions */}
        <PatientDashboardWidget
          title="Current Prescriptions"
          description="Medication plan currently shown in the mock patient record."
        >
          <div className="space-y-3">
            {patientCurrentPrescriptions.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500">{item.schedule}</p>
                  </div>
                  <Pill className="h-5 w-5 text-teal-700" />
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.note}</p>
              </article>
            ))}
          </div>
        </PatientDashboardWidget>
      </section>

      {/* Middle section */}
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <PatientDashboardWidget
          title="Current Medications"
          description="A quick medication overview for your current care plan."
        >
          <div className="space-y-3">
            {patientCurrentPrescriptions.map((item) => (
              <article
                key={`${item.name}-med`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-base font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-sm text-slate-500">{item.schedule}</p>
                <p className="mt-2 text-sm text-slate-600">{item.note}</p>
              </article>
            ))}
          </div>
        </PatientDashboardWidget>

        <PatientDashboardWidget
          title="Upcoming Appointments"
          description="Mock appointments scheduled for your next care touchpoints."
        >
          <div className="space-y-3">
            {patientUpcomingAppointments.map((appointment) => (
              <article
                key={appointment.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {appointment.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.when}
                    </p>
                    <p className="text-sm text-slate-500">
                      {appointment.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
                    {appointment.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </PatientDashboardWidget>

        <PatientDashboardWidget
          title="Last Medical Event"
          description="The most recent event from the existing timeline dataset."
        >
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {patientLastMedicalEvent.type}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {patientLastMedicalEvent.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {patientLastMedicalEvent.summary}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {patientLastMedicalEvent.facility} · {patientLastMedicalEvent.clinician}
            </p>
          </article>
        </PatientDashboardWidget>
      </section>

      {/* Recent activity + actions */}
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PatientDashboardWidget
          title="Recent Medical Activity"
          description="A mocked timeline-style view of your recent care activity."
        >
          <div className="space-y-3">
            {patientRecentMedicalActivity.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {event.type}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {event.title}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                    {new Date(event.occurredAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{event.summary}</p>
              </article>
            ))}
          </div>
        </PatientDashboardWidget>

        <PatientDashboardWidget
          title="Quick Actions"
          description="Jump to the existing patient workflow routes."
        >
          <div className="grid gap-3">
            {quickActions.map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4
                 transition hover:border-teal-200 hover:bg-white"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {label}
                </span>
                <Icon className="h-4 w-4 text-teal-700" />
              </Link>
            ))}
          </div>
        </PatientDashboardWidget>
      </section>

      {/* Footer note */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Mocked patient view
        </p>
        <p className="mt-2 text-sm text-slate-500">
          All dashboard content is mock-only and does not connect to any live services.
        </p>
      </section>
    </div>
  );
}
