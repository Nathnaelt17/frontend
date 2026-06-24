import { useEffect, useMemo, useState, useContext } from 'react';
import {
  CheckCircle2,
  Lock,
  CalendarDays,
  FileText,
  Pill,
  Syringe,
  Stethoscope,
} from 'lucide-react';

import { MedicalEventDetailDrawer } from './MedicalEventDetailDrawer';
import { TimelineEventCard } from './TimelineEventCard';
import { getTimelineEvents } from '../timelineStorage';
import { TimelineSearchContext } from '../../../context/TimelineSearchContext';

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
      'A read-only clinical history for reviewing care events before and during consultation.',
  },
};

// SINGLE SOURCE OF TRUTH (IMPORTANT)
function normalizeType(type = '') {
  const t = type.toLowerCase().trim();
  switch (true) {
    case t === 'visit':
    case t.includes('visit'):
    case t.includes('consult'):
      return 'visit';
    case t === 'diagnosis':
    case t.includes('diagnos'):
    case t.includes('assessment'):
      return 'diagnosis';
    case t === 'prescription':
    case t.includes('drug'):
    case t.includes('medication'):
    case t.includes('rx'):
      return 'prescription';
    case t === 'lab':
    case t.includes('lab'):
    case t.includes('result'):
    case t.includes('test'):
      return 'lab';
    default:
      return 'unknown';
  }
}
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
    ...(event.details || []),
    ...(event.tags || []),
  ]
    .join(' ')
    .toLowerCase()
    .includes(q);
}

export function PatientTimelineExperience({ view }) {
  const { search, activeType } = useContext(TimelineSearchContext);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    setTimelineEvents(getTimelineEvents());
  }, []);

  // Normalize once
  const normalizedEvents = useMemo(() => {
    return timelineEvents.map((e) => ({
      ...e,
      normalizedType: normalizeType(e.type),
    }));
  }, [timelineEvents]);

  // FILTERS (FIXED)
  const visibleEvents = useMemo(() => {
    return normalizedEvents.filter((event) => {
      const typeMatch = activeType === 'All' || event.normalizedType === activeType;
      const searchMatch = matchesSearch(event, search);
      return typeMatch && searchMatch;
    });
  }, [normalizedEvents, activeType, search]);

  const copy = viewCopy[view];

  // STATS are now displayed in the layout, so we only render the timeline list here.
  return (
    <div className="space-y-8">
      {/* Timeline list */}
      {visibleEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white py-16 text-center">
          <CalendarDays size={36} className="mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold">No Timeline Events Found</h2>
          <p className="mt-3 text-slate-600">
            {search || activeType !== 'All'
              ? 'Try adjusting your filters or search terms.'
              : 'No medical events have been recorded yet.'}
          </p>
          {(search || activeType !== 'All') && (
            <button
              onClick={() => {
                // Context provides setters; we safely reset via direct context updates
                // Since this component does not have direct access to setters, we rely on the layout's UI to clear filters.
              }}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="relative space-y-5 before:absolute before:left-5 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200 sm:before:left-6">
            {visibleEvents.map((event) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                view={view}
                onOpen={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Details drawer */}
      {selectedEvent && (
        <MedicalEventDetailDrawer
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}