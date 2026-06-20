import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  Building2,
  CalendarDays,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  LogOut,
  Pill,
  Stethoscope,
  User,
  Users,
  X
} from 'lucide-react';

import { Logo } from '../../shared/Logo';
import { useAuth } from '../../../app/providers/AuthContext';
import { ROLES } from '../../../constants/roles';

const navItemsByRole = {
  [ROLES.DOCTOR]: [
    {
      label: 'Dashboard',
      path: '/doctor/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Patients',
      path: '/doctor/patients',
      icon: Users
    },
    {
      label: 'Appointments',
      path: '/doctor/appointments',
      icon: CalendarDays
    }
  ],

  [ROLES.PATIENT]: [
    {
      label: 'Dashboard',
      path: '/patient/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Appointments',
      path: '/patient/appointments',
      icon: CalendarDays
    },
    {
      label: 'Medical History',
      path: '/patient/medicalhistorypage',
      icon: ClipboardList
    },
    {
      label: 'Timeline',
      path: '/patient/timeline',
      icon: Activity
    },
    {
      label: 'Prescriptions',
      path: '/patient/prescriptions',
      icon: Pill
    },
    {
      label: 'Profile',
      path: '/patient/profile',
      icon: User
    }
  ],

  [ROLES.HOSPITAL_ADMIN]: [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Doctors',
      path: '/admin/doctors',
      icon: Stethoscope
    },
    {
      label: 'Patients',
      path: '/admin/patients',
      icon: Users
    },
    {
      label: 'Appointments',
      path: '/admin/appointments',
      icon: CalendarDays
    },
    {
      label: 'Audit Logs',
      path: '/admin/audit-logs',
      icon: FileClock
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: ClipboardList
    }
  ],

  [ROLES.SUPER_ADMIN]: [
    {
      label: 'Dashboard',
      path: '/super-admin/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Hospitals',
      path: '/super-admin/hospitals',
      icon: Building2
    },
    {
      label: 'Hospital Admins',
      path: '/super-admin/hospital-admins',
      icon: Users
    },
    {
      label: 'Audit Logs',
      path: '/super-admin/audit-logs',
      icon: FileClock
    },
    {
      label: 'Platform',
      path: '/super-admin/platform',
      icon: ClipboardList
    }
  ]
};

const roleLabels = {
  [ROLES.DOCTOR]: 'Doctor Workspace',
  [ROLES.PATIENT]: 'Patient Portal',
  [ROLES.HOSPITAL_ADMIN]: 'Hospital Admin Console',
  [ROLES.SUPER_ADMIN]: 'Super Admin Console'
};

export function RoleSidebar({
  role,
  open,
  onClose
}) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const navItems = navItemsByRole[role] || [];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <Logo
              size={34}
              variant="dark"
            />

            <div>
              <p className="text-sm font-bold text-slate-950">
                TenaLink
              </p>

              <p className="text-xs font-medium text-slate-500">
                {roleLabels[role]}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4 space-y-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <ClipboardList size={16} />
              Care Network
            </div>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              Application shell placeholder
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}