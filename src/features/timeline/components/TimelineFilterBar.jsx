import { Filter } from 'lucide-react';
import { timelineFilterOptions } from '../data/timelineData';
export function TimelineFilterBar({
  activeType,
  onChange
}) {
  const options = ['All', ...timelineFilterOptions];
  return <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:max-w-[520px]"><span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-slate-500"><Filter size={16} />Filter</span>{options.map(type => <button type="button" onClick={() => onChange(type)} className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${activeType === type ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`} key={type}>{type}</button>)}</div>;
}
