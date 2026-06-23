import { Routes, Route, Navigate } from 'react-router-dom';
import { HospitalsPage } from '../pages/patient/HospitalsPage';
import { PatientDashboardPage } from '../pages/patient/PatientDashboardPage';
import { PatientTimelinePage } from '../pages/patient/PatientTimelinePage';
import { AppointmentsPage } from '../pages/patient/AppointmentsPage';
import { PrescriptionsPage } from '../pages/patient/PrescriptionsPage';
import { ProfilePage } from '../pages/shared/ProfilePage';
import { DoctorsPage } from '../pages/patient/DoctorsPage';
import { BookAppointmentPage } from '../pages/patient/BookAppointmentPage';
import {MedicalHistoryPage} from '../pages/patient/MedicalHistoryPage';

export function PatientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patient/dashboard" replace />} />
      <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
      <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
      <Route path="/patient/timeline" element={<PatientTimelinePage />} />
      <Route path="/patient/appointments" element={<AppointmentsPage />} />
      <Route path="/patient/prescriptions" element={<PrescriptionsPage />} />
      <Route path="/patient/profile" element={<ProfilePage />} />
      <Route path="/patient/hospitals" element={<HospitalsPage />} />
      <Route path="/patient/doctors" element={<DoctorsPage />} />
      <Route path="/patient/book-appointment" element={<BookAppointmentPage />} />
      <Route path="/patient/medicalhistorypage" element={<MedicalHistoryPage />} /> 
    </Routes>
  );
}
