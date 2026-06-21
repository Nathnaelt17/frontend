import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Lock,
  CalendarDays,
  FileText,
  Pill,
  Syringe,
  Stethoscope
} from 'lucide-react';

import { MedicalEventDetailDrawer } from './MedicalEventDetailDrawer';
import { TimelineEventCard } from './TimelineEventCard';
import { TimelineFilterBar } from './TimelineFilterBar';
import { TimelineSearchBar } from './TimelineSearchBar';
import { getTimelineEvents } from '../timelineStorage';

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
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    setTimelineEvents(getTimelineEvents());
  }, []);

  // Normalize ONCE
  const normalizedEvents = useMemo(() => {
    return timelineEvents.map((e) => ({
      ...e,
      normalizedType: normalizeType(e.type),
    }));
  }, [timelineEvents]);

  // FILTERS (FIXED)
  const visibleEvents = useMemo(() => {
    return normalizedEvents.filter((event) => {
      const typeMatch =
        activeType === 'All' || event.normalizedType === activeType;

      const searchMatch = matchesSearch(event, search);

      return typeMatch && searchMatch;
    });
  }, [normalizedEvents, activeType, search]);

  const copy = viewCopy[view];

  // STATS (FIXED + CONSISTENT)
  const stats = useMemo(() => {
    const base = {
      visit: 0,
      diagnosis: 0,
      prescription: 0,
      lab: 0,
    };

    for (const event of normalizedEvents) {
      const key = event.normalizedType;
      if (base[key] !== undefined) {
        base[key] += 1;
      }
    }

    return {
      ...base,
      total: normalizedEvents.length,
      visible: visibleEvents.length,
    };
  }, [normalizedEvents, visibleEvents]);

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              <Lock size={16} />
              {copy.eyebrow}
            </div>

            <h1 className="mt-2 text-3xl font-bold">{copy.title}</h1>

            <p className="mt-3 max-w-2xl text-blue-50">
              {copy.description}
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-xl bg-white/20 px-5 py-3 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                Total Events
              </p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="rounded-xl bg-white/20 px-5 py-3 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                Visible
              </p>
              <p className="text-2xl font-bold">{stats.visible}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <FileText className="mb-3 text-blue-600" size={24} />
          <p className="text-sm text-slate-500">Visits</p>
          <p className="text-3xl font-bold">{stats.visit}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <Stethoscope className="mb-3 text-purple-600" size={24} />
          <p className="text-sm text-slate-500">Diagnoses</p>
          <p className="text-3xl font-bold">{stats.diagnosis}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <Pill className="mb-3 text-green-600" size={24} />
          <p className="text-sm text-slate-500">Prescriptions</p>
          <p className="text-3xl font-bold">{stats.prescription}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <Syringe className="mb-3 text-orange-600" size={24} />
          <p className="text-sm text-slate-500">Lab Uploads</p>
          <p className="text-3xl font-bold">{stats.lab}</p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <TimelineSearchBar value={search} onChange={setSearch} />
        </div>

        <TimelineFilterBar
          activeType={activeType}
          onChange={setActiveType}
        />
      </div>

      {/* TIMELINE */}
      {visibleEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white py-16 text-center">
          <CalendarDays size={36} className="mx-auto mb-4 text-blue-600" />

          <h2 className="text-2xl font-bold">
            No Timeline Events Found
          </h2>

          <p className="mt-3 text-slate-600">
            {search || activeType !== 'All'
              ? 'Try adjusting your filters or search terms.'
              : 'No medical events have been recorded yet.'}
          </p>

          {(search || activeType !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setActiveType('All');
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

      {/* DETAILS DRAWER */}
      {selectedEvent && (
        <MedicalEventDetailDrawer
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}