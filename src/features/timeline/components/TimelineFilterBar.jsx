import { Filter, ChevronDown } from 'lucide-react';
import { timelineFilterOptions } from '../data/timelineData';
import { useTimelineSearch } from '../../../context/TimelineSearchContext';

export default function TimelineFilterBar() {
  const { activeType, setActiveType } = useTimelineSearch();
  const options = ['All', ...timelineFilterOptions];
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20">
        <div className="flex items-center gap-1.5 pl-3 text-sm font-semibold text-slate-500">
          <Filter size={16} />
          <span className="hidden sm:inline">Filter</span>
        </div>
        <div className="relative">
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            className="appearance-none bg-transparent py-2.5 pr-10 pl-1 text-sm font-medium text-slate-700 focus:outline-none"
          >
            {options.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}