import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addPrescription,
  PRESCRIPTION_STATUS
} from '../../features/patient/prescriptionsStorage';
import { addTimelineEvent } from '../../features/timeline/timelineStorage';

export function CreatePrescriptionPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    addPrescription({
      patientId,
      patientName: 'Patient',
      medication,
      dosage,
      frequency,
      duration,
      instructions,
      prescribedBy: 'Dr. Demo',
      prescribedDate: new Date()
        .toISOString()
        .split('T')[0],
      status: PRESCRIPTION_STATUS.ACTIVE
    });
    addTimelineEvent({
  type: 'Prescription Issued',
  occurredAt: new Date().toISOString(),

  title: `${medication} prescription issued`,

  facility: 'Doctor Portal',

  clinician: 'Dr. Demo',

  summary: `${dosage} • ${frequency}`,

  details: [
    `Medication: ${medication}`,
    `Dosage: ${dosage}`,
    `Frequency: ${frequency}`,
    `Duration: ${duration}`
  ],

  metadata: [
    {
      label: 'Medication',
      value: medication
    },
    {
      label: 'Dosage',
      value: dosage
    },
    {
      label: 'Duration',
      value: duration
    }
  ],

  notes: [
    instructions || 'No additional instructions'
  ],

  tags: [
    'Prescription',
    medication
  ],

  referenceId: `RX-${Date.now()}`
});

    setSuccess(true);

    setTimeout(() => {
      navigate(`/doctor/patients/${patientId}`);
    }, 1200);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create Prescription
        </h1>

        <p className="mt-2 text-slate-600">
          Issue a prescription for patient {patientId}.
        </p>
      </div>

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800">
            Prescription issued successfully.
          </p>

          <p className="mt-1 text-sm text-green-700">
            Returning to patient summary...
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label className="mb-2 block font-medium">
            Medication
          </label>

          <input
            required
            value={medication}
            onChange={(e) =>
              setMedication(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Dosage
          </label>

          <input
            required
            value={dosage}
            onChange={(e) =>
              setDosage(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Frequency
          </label>

          <input
            required
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Duration
          </label>

          <input
            required
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Instructions
          </label>

          <textarea
            rows={4}
            value={instructions}
            onChange={(e) =>
              setInstructions(e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isSubmitting
            ? 'Issuing Prescription...'
            : 'Issue Prescription'}
        </button>
      </form>
    </div>
  );
}

export default CreatePrescriptionPage;