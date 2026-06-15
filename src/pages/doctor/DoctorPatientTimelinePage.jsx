import { useParams } from 'react-router-dom';
import { DoctorPageHeader } from '../../features/doctor/components/DoctorPageHeader';
import { PatientContextBanner } from '../../features/doctor/components/PatientContextBanner';
import { getDoctorPatientSummary } from '../../features/doctor/mockPatientSummaries';
import { PatientTimelineExperience } from '../../features/timeline/components/PatientTimelineExperience';
export function DoctorPatientTimelinePage() {
  const {
    patientId
  } = useParams();
  const patient = patientId ? getDoctorPatientSummary(patientId) : null;
  return <div className="space-y-6"><DoctorPageHeader title="Patient Timeline" subtitle={patient ? `Viewing a read-only clinical history for ${patient.name} before consultation.` : 'Viewing a read-only clinical history before consultation.'} patientName={patient?.name} breadcrumbs={[{
      label: 'Patients',
      to: '/doctor/patients'
    }, {
      label: patient?.name ?? patientId ?? 'Patient',
      to: patientId ? `/doctor/patients/${patientId}` : undefined
    }, {
      label: 'Timeline'
    }]} /><PatientContextBanner patientId={patientId} /><PatientTimelineExperience view="doctor" /></div>;
}
