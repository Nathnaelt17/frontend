import { Routes, Route, Navigate } from 'react-router-dom';

import { PagePlaceholder } from '../components/shared/PagePlaceholder';

export function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />
      <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
      <Route
        path="/super-admin/dashboard"
        element={<PagePlaceholder title="Super Admin Dashboard" section="Super Admin Console" />}
      />
      <Route
        path="/super-admin/hospitals"
        element={<PagePlaceholder title="Super Admin Hospitals" section="Super Admin Console" />}
      />
      <Route
        path="/super-admin/hospital-admins"
        element={<PagePlaceholder title="Super Admin Hospital Admins" section="Super Admin Console" />}
      />
      <Route
        path="/super-admin/audit-logs"
        element={<PagePlaceholder title="Super Admin Audit Logs" section="Super Admin Console" />}
      />
      <Route
        path="/super-admin/platform"
        element={<PagePlaceholder title="Super Admin Platform" section="Super Admin Console" />}
      />
    </Routes>
  );
}
