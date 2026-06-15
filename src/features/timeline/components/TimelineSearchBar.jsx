import { Search } from 'lucide-react';
export function TimelineSearchBar({
  value,
  onChange,
  placeholder = 'Search by diagnosis, doctor, facility, medicine, lab, or reference ID'
}) {
  return <label className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50"><Search size={18} /><input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="h-11 min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400" /></label>;
}
