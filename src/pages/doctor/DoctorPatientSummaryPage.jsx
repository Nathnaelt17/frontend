import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ClinicalSummaryPanel } from '../../features/doctor/components/ClinicalSummaryPanel';
import { DoctorPageHeader } from '../../features/doctor/components/DoctorPageHeader';
import { PatientContextBanner } from '../../features/doctor/components/PatientContextBanner';
import { getDoctorPatientSummary } from '../../features/doctor/mockPatientSummaries';

export function DoctorPatientSummaryPage() {
  const navigate = useNavigate();

  const { patientId } = useParams();

  const patient = patientId
    ? getDoctorPatientSummary(patientId)
    : null;

  if (!patient) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-sm">
        No patient summary is available for this record.
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <DoctorPageHeader
        title="Patient Summary"
        subtitle="Quick clinical summary for the current consultation."
        patientName={patient.name}
        breadcrumbs={[
          {
            label: 'Patients',
            to: '/doctor/patients'
          },
          {
            label: patient.name,
            to: `/doctor/patients/${patient.patientId}`
          },
          {
            label: 'Summary'
          }
        ]}
      />

      <PatientContextBanner patientId={patient.patientId} />

      {/* IMPORTANT ACTIONS FIRST */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Patient Actions
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/doctor/patients')}
          >
            Back to Patients
          </Button>

          <Button
            onClick={() =>
              navigate(
                `/doctor/patients/${patient.patientId}/timeline`
              )
            }
          >
            View Timeline
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              navigate(
                `/doctor/patients/${patient.patientId}/add-event`
              )
            }
          >
            Add Medical Event
          </Button>

          <Button
            onClick={() =>
              navigate(
                `/doctor/patients/${patient.patientId}/prescribe`
              )
            }
          >
            Create Prescription
          </Button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          These are the most common actions performed during a patient review.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ClinicalSummaryPanel
          title="Clinical Snapshot"
          description="High-priority facts for the current consultation."
          emphasis="default"
          items={[
            {
              label: 'Active Problem',
              value: patient.activeProblem
            },
            {
              label: 'Reason For Visit',
              value: patient.reasonForVisit
            },
            {
              label: 'Risk Level',
              value: patient.riskLevel
            },
            {
              label: 'Primary Doctor',
              value: patient.primaryDoctor
            },
            {
              label: 'Last Encounter',
              value: patient.lastEncounter
            }
          ]}
        />

        <ClinicalSummaryPanel
          title="Latest Vitals"
          description="Most recent clinical observations recorded for this patient."
          emphasis="success"
          items={[
            {
              label: 'Blood Pressure',
              value: patient.latestVitals.bloodPressure
            },
            {
              label: 'Heart Rate',
              value: patient.latestVitals.heartRate
            },
            {
              label: 'Weight',
              value: patient.latestVitals.weight
            },
            {
              label: 'Temperature',
              value: patient.latestVitals.temperature
            }
          ]}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ClinicalSummaryPanel
          title="Current Medications"
          description="Medication plan currently relevant to the clinical review."
          items={patient.currentMedications.map((item) => ({
            label: 'Medication',
            value: item
          }))}
        />

        <ClinicalSummaryPanel
          title="Prominent Allergies"
          description="Important allergies to confirm before further actions."
          emphasis="alert"
          items={patient.prominentAllergies.map((item) => ({
            label: 'Allergy',
            value: item
          }))}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ClinicalSummaryPanel
          title="Recent Activity"
          description="The latest care updates available for this patient."
          items={[
            {
              label: 'Latest Diagnosis',
              value: patient.latestDiagnosis
            },
            {
              label: 'Latest Prescription',
              value: patient.latestPrescription
            },
            {
              label: 'Latest Lab Result',
              value: patient.latestLabResult
            }
          ]}
        />

        <ClinicalSummaryPanel
          title="Recommended Next Action"
          description="A concise next step for the current consultation."
          emphasis="success"
          items={[
            {
              label: 'Action',
              value: patient.recommendedNextAction
            }
          ]}
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Notes
        </p>

        <p className="mt-4 text-sm text-slate-500">
          All content on this page is mocked for the doctor review experience
          and does not connect to any live services.
        </p>
      </section>
    </div>
  );
}

export default DoctorPatientSummaryPage;