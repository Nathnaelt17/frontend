import { useMemo } from 'react';
import {
  Building2,
  Users,
  UserCog,
  CalendarDays,
  Activity,
  ShieldCheck
} from 'lucide-react';

export function SuperAdminDashboardPage() {
  const stats = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const hospitals = JSON.parse(localStorage.getItem('hospitals') || '[]');
    const appointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    );

    const doctors = users.filter(
      user =>
        String(user.role).toLowerCase() === 'doctor'
    );

    const patients = users.filter(
      user =>
        String(user.role).toLowerCase() === 'patient'
    );

    const hospitalAdmins = users.filter(user =>
      ['admin', 'hospital_admin'].includes(
        String(user.role).toLowerCase()
      )
    );

    return {
      hospitals: hospitals.length,
      doctors: doctors.length,
      patients: patients.length,
      hospitalAdmins: hospitalAdmins.length,
      appointments: appointments.length
    };
  }, []);

  const cards = [
    {
      title: 'Hospitals',
      value: stats.hospitals,
      icon: Building2
    },
    {
      title: 'Doctors',
      value: stats.doctors,
      icon: Users
    },
    {
      title: 'Patients',
      value: stats.patients,
      icon: Activity
    },
    {
      title: 'Hospital Admins',
      value: stats.hospitalAdmins,
      icon: UserCog
    },
    {
      title: 'Appointments',
      value: stats.appointments,
      icon: CalendarDays
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Super Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Platform-wide overview and management.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(card => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={28}
                  className="text-blue-600"
                />

                <span className="text-3xl font-bold text-slate-900">
                  {card.value}
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-600">
                {card.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Platform Status
          </h2>
        </div>

        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            System Operational
          </p>

          <p className="mt-1 text-sm text-emerald-700">
            All platform services are running normally.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-slate-50 p-4">
            New hospital registrations will appear here.
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            New hospital admin activity will appear here.
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            Platform audit events will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}