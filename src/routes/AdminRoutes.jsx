import { Routes, Route, Navigate } from 'react-router-dom';

import AuditLogsPage from '../pages/admin/AuditLogsPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { HospitalsPage } from '../pages/shared/HospitalsPage';
import { PagePlaceholder } from '../components/shared/PagePlaceholder';

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        index
        element={<Navigate to="dashboard" replace />}
      />

      <Route
        path="dashboard"
        element={<AdminDashboardPage />}
      />

      <Route
        path="hospitals"
        element={<HospitalsPage />}
      />

      <Route
        path="doctors"
        element={
          <PagePlaceholder
            title="Admin Doctors"
            section="Admin Console"
          />
        }
      />

      <Route
        path="patients"
        element={
          <PagePlaceholder
            title="Admin Patients"
            section="Admin Console"
          />
        }
      />

      <Route
        path="appointments"
        element={
          <PagePlaceholder
            title="Admin Appointments"
            section="Admin Console"
          />
        }
      />

      <Route
        path="settings"
        element={
          <PagePlaceholder
            title="Admin Settings"
            section="Admin Console"
          />
        }
      />

      <Route
        path="users"
        element={
          <PagePlaceholder
            title="Admin Users"
            section="Admin Console"
          />
        }
      />

      <Route
        path="audit-logs"
        element={<AuditLogsPage />}
      />

      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
}