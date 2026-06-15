import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { DoctorPageHeader } from '../../features/doctor/components/DoctorPageHeader';
import { EventFormSection } from '../../features/doctor/components/EventFormSection';
import { EventPreviewCard } from '../../features/doctor/components/EventPreviewCard';
import { EventTypeSelector } from '../../features/doctor/components/EventTypeSelector';
import { PatientContextBanner } from '../../features/doctor/components/PatientContextBanner';
import { getMedicalEventTemplate } from '../../features/doctor/mockMedicalEventTemplates';
import { getDoctorPatientSummary } from '../../features/doctor/mockPatientSummaries';
export function AddMedicalEventPage() {
  const {
    patientId
  } = useParams();
  const [selectedType, setSelectedType] = useState('VISIT_CREATED');
  const [formValues, setFormValues] = useState({
    title: '',
    facility: '',
    priority: '',
    primaryDiagnosis: '',
    notes: '',
    medication: '',
    instructions: '',
    lab: '',
    result: '',
    summary: '',
    followUp: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const patient = patientId ? getDoctorPatientSummary(patientId) : null;
  const selectedTemplate = useMemo(() => getMedicalEventTemplate(selectedType), [selectedType]);
  const updateField = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return <div className="space-y-6"><DoctorPageHeader title="Add Medical Event" subtitle={patient ? `Create a new append-only timeline entry for ${patient.name}.` : 'Create a new append-only timeline entry for this patient.'} patientName={patient?.name} breadcrumbs={[{
      label: 'Patients',
      to: '/doctor/patients'
    }, {
      label: patient?.name ?? patientId ?? 'Patient',
      to: patientId ? `/doctor/patients/${patientId}` : undefined
    }, {
      label: 'Add Medical Event'
    }]} /><PatientContextBanner patientId={patientId} /><section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><div className="space-y-6"><EventTypeSelector selectedType={selectedType} onSelect={setSelectedType} /><EventFormSection selectedType={selectedType} values={formValues} onChange={updateField} /><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Mock Submit</p><h3 className="mt-1 text-xl font-semibold text-slate-950">Append event to timeline</h3></div><Button onClick={handleSubmit}>Submit Event</Button></div><p className="mt-3 text-sm text-slate-500">This action is intentionally mocked and does not persist any record.</p>{submitted ? <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Mock event appended for {selectedTemplate.label}.</p> : null}</section></div><EventPreviewCard selectedType={selectedType} values={formValues} /></section></div>;
}
