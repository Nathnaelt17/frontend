import { useMemo, useState } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';

import { MedicalEventDetailDrawer } from './MedicalEventDetailDrawer';
import { TimelineEventCard } from './TimelineEventCard';
import { TimelineFilterBar } from './TimelineFilterBar';
import { TimelineSearchBar } from './TimelineSearchBar';
import { patientTimelineEvents } from '../data/timelineData';

const viewCopy = {
  patient: {
    eyebrow: 'Patient Timeline',
    title: 'Immutable Medical History',
    description:
      'A chronological view of visits, diagnoses, prescriptions, lab uploads, and doctor notes.',
  },
  doctor: {
    eyebrow: 'Doctor Review',
    title: 'Patient Medical Timeline',
    description:
      'A read-only clinical history for reviewing care events before and dux consultation.',
  },
};

const TIMELINE_RULES = [
  'Events are displayed newest first for fast clinical review.',
  'Timeline entries are immutable and cannot be edited from this screen.',
  'Doctor and patient views share the same record source but emphasize different context.',
];

function matchesSearch(event, search) {
  const q = search.trim().toLowerCase();
  if (!q) return true;

  return [
    event.type,
    event.title,
    event.facility,
    event.clinician,
    event.summary,
    event.referenceId,
    ...event.details,
    ...event.tags,
  ]
    .join(' ')
    .toLowerCase()
    .includes(q);
}

export function PatientTimelineExperience({ view }) {
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const visibleEvents = useMemo(
    () =>
      patientTimelineEvents.filter(
        (event) =>
          (activeType === 'All' || event.type === activeType) &&
          matchesSearch(event, search)
      ),
    [activeType, search]
  );

  const copy = viewCopy[view];

  return (
    <div className="space-y-6">

      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-emerald-50 px-5 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            {/* Title */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                <Lock size={16} />
                {copy.eyebrow}
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                {copy.title}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {copy.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:min-w-[420px]">
              <Stat label="Events" value={patientTimelineEvents.length} />
              <Stat label="Visible" value={visibleEvents.length} />
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Status
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-800">
                  Read-only
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Search + Filters */}
        <div className="grid gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <TimelineSearchBar value={search} onChange={setSearch} />
          <TimelineFilterBar activeType={activeType} onChange={setActiveType} />
        </div>
      </section>

      {/* Main Layout */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* Timeline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative space-y-5 before:absolute before:left-5 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200 sm:before:left-6">

            {visibleEvents.map((event) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                view={view}
                onOpen={() => setSelectedEvent(event)}
              />
            ))}

            {visibleEvents.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="font-semibold text-slate-900">
                  No timeline events match this view.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Clear filters or adjust the search phrase.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-24 xl:self-start">

          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Timeline Rules
          </h3>

          <div className="mt-4 space-y-4">
            {TIMELINE_RULES.map((rule) => (
              <div key={rule} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                <p className="text-sm leading-6 text-slate-600">{rule}</p>
              </div>
            ))}
          </div>

        </aside>
      </section>

      {/* Drawer */}
      {selectedEvent && (
        <MedicalEventDetailDrawer
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

/* Small helper component */
function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
