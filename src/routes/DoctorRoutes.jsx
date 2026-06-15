import { Routes, Route, Navigate } from 'react-router-dom';

import { DoctorDashboardPage } from '../pages/doctor/DoctorDashboardPage';
import { DoctorPatientsPage } from '../pages/doctor/DoctorPatientsPage';
import { DoctorPatientSummaryPage } from '../pages/doctor/DoctorPatientSummaryPage';
import { DoctorPatientTimelinePage } from '../pages/doctor/DoctorPatientTimelinePage';
import { AddMedicalEventPage } from '../pages/doctor/AddMedicalEventPage';
import { DoctorAppointmentsPage } from '../pages/doctor/DoctorAppointmentsPage';
import { PagePlaceholder } from '../components/shared/PagePlaceholder';

export function DoctorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
      <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
      <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
      <Route path="/doctor/patients/:patientId" element={<DoctorPatientSummaryPage />} />
      <Route path="/doctor/patients/:patientId/timeline" element={<DoctorPatientTimelinePage />} />
      <Route path="/doctor/patients/:patientId/add-event" element={<AddMedicalEventPage />} />
      <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
      <Route
        path="/doctor/prescriptions"
        element={<PagePlaceholder title="Doctor Prescriptions" section="Doctor Workspace" />}
      />
    </Routes>
  );
}
