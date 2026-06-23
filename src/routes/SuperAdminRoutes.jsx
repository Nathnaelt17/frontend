import { Routes, Route, Navigate } from 'react-router-dom';

import { PagePlaceholder } from '../components/shared/PagePlaceholder';
import { SuperAdminDashboardPage } from '../pages/super-admin/SuperAdminDashboardPage';
import { SuperAdminHospitalsPage } from '../pages/super-admin/SuperAdminHospitalsPage';

export function SuperAdminRoutes() {
  return (
    <Routes>
      {/* Default /super-admin -> dashboard */}
      <Route
        index
        element={<Navigate to="dashboard" replace />}
      />

      <Route
        path="dashboard"                                                                          
        element={<SuperAdminDashboardPage />}
      />

      <Route
        path="hospitals"
        element={
        <SuperAdminHospitalsPage />
        }
      />

      <Route
        path="hospital-admins"
        element={
          <PagePlaceholder
            title="Super Admin Hospital Admins"
            section="Super Admin Console"
          />
        }
      />

      <Route
        path="audit-logs"
        element={
          <PagePlaceholder
            title="Super Admin Audit Logs"
            section="Super Admin Console"
          />
        }
      />

      <Route
        path="platform"
        element={
          <PagePlaceholder
            title="Super Admin Platform"
            section="Super Admin Console"
          />
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
}