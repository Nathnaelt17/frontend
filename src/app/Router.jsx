import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '../components/layouts/Layout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';

import { PatientRoutes } from '../routes/PatientRoutes';
import { DoctorRoutes } from '../routes/DoctorRoutes';
import { AdminRoutes } from '../routes/AdminRoutes';
import { SuperAdminRoutes } from '../routes/SuperAdminRoutes';
import { ROLES } from '../constants/roles';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
                <PatientRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
                <DoctorRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={[ROLES.HOSPITAL_ADMIN]}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/*"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                <SuperAdminRoutes />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
