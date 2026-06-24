import { Routes, Route, Navigate } from 'react-router-dom';
import { HospitalsPage } from '../pages/patient/HospitalsPage';
import { PatientDashboardPage } from '../pages/patient/PatientDashboardPage';
import { PatientTimelinePage } from '../pages/patient/PatientTimelinePage';
import { AppointmentsPage } from '../pages/patient/AppointmentsPage';
import { PrescriptionsPage } from '../pages/patient/PrescriptionsPage';
import { ProfilePage } from '../pages/shared/ProfilePage';
import { DoctorsPage } from '../pages/patient/DoctorsPage';
import { BookAppointmentPage } from '../pages/patient/BookAppointmentPage';
// New nested medical history routing
import { TimelineSearchProvider } from '../context/TimelineSearchContext';
import OverviewPage from '../pages/patient/history/OverviewPage';
import { MedicalHistoryLayout } from '../pages/patient/MedicalHistoryLayout';
import { PatientTimelineExperience } from '../features/timeline/components/PatientTimelineExperience';
import LabsPage from '../pages/patient/history/LabsPage';
import DocumentsPage from '../pages/patient/history/DocumentsPage';

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
      {/* Debug route */}
      <Route path="/patient/debug" element={<div style={{ padding: '2rem', background: 'yellow', color: 'black' }}>PatientRoutes debug works</div>} />


   <Route path="/patient/history/*" element={<MedicalHistoryLayout />}>
     <Route index element={<OverviewPage />} />
      <Route path="overview" element={<OverviewPage />} />
      <Route path="timeline" element={<PatientTimelineExperience view="patient" />} />
      <Route path="labs" element={<LabsPage />} />
      <Route path="documents" element={<DocumentsPage />} />
      <Route path="*" element={<OverviewPage />} />
   </Route> 
    </Routes>
  );
}
