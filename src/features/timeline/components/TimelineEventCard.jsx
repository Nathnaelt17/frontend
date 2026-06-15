import { CalendarDays } from 'lucide-react';
import { timelineTypeMeta } from '../data/timelineData';
function formatDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
}
function formatTime(value) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
}
export function TimelineEventCard({
  event,
  view,
  onOpen
}) {
  const meta = timelineTypeMeta[event.type];
  const Icon = meta.icon;
  return <article className="relative pl-12 sm:pl-14" onClick={() => onOpen?.(event)} role="button" tabIndex={0} onKeyDown={keyEvent => {
    if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
      keyEvent.preventDefault();
      onOpen?.(event);
    }
  }}><div className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${meta.tone}`}><Icon size={19} /></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${meta.tone}`}>{event.type}</span><span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"><CalendarDays size={14} />{formatDate(event.occurredAt)} at {formatTime(event.occurredAt)}</span></div><h3 className="mt-3 text-lg font-bold text-slate-950">{event.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{event.summary}</p></div><div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left lg:w-52"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reference</p><p className="mt-1 text-sm font-bold text-slate-900">{event.referenceId}</p></div></div><div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Facility</p><p className="mt-1 text-sm font-semibold text-slate-900">{event.facility}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{view === 'doctor' ? 'Recorded By' : 'Clinician'}</p><p className="mt-1 text-sm font-semibold text-slate-900">{event.clinician}</p></div></div><ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">{event.details.map(detail => <li className="rounded-lg bg-slate-50 px-3 py-2" key={detail}>{detail}</li>)}</ul><div className="mt-4 flex flex-wrap gap-2">{event.tags.map(tag => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600" key={tag}>{tag}</span>)}</div></div></article>;
}
