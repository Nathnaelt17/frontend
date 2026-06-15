import { Routes, Route, Navigate } from 'react-router-dom';

import AuditLogsPage from '../pages/admin/AuditLogsPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { HospitalsPage } from '../pages/shared/HospitalsPage';
import { PagePlaceholder } from '../components/shared/PagePlaceholder';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/hospitals" element={<HospitalsPage />} />
      <Route
        path="/admin/doctors"
        element={<PagePlaceholder title="Admin Doctors" section="Admin Console" />}
      />
      <Route
        path="/admin/users"
        element={<PagePlaceholder title="Admin Users" section="Admin Console" />}
      />
      <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
    </Routes>
  );
}
