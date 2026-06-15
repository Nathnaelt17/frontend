import { ArrowRight, ClipboardList, FilePlus2, LayoutList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { DashboardWidget } from '../../features/doctor/components/DashboardWidget';
import { clinicalTasks, recentClinicalActivity, recentPatients } from '../../features/doctor/mockDoctorDashboard';
export function DoctorDashboardPage() {
  return <div className="space-y-8"><header className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Doctor Workspace</p><h1 className="text-3xl font-bold text-slate-900">Doctor dashboard</h1><p className="text-slate-600">A quick summary of recent patients, clinical activity, and follow-up priorities.</p></header><DashboardWidget title="Quick actions" description="Jump directly into the existing doctor workflow routes."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{
          label: 'Browse patients',
          to: '/doctor/patients',
          icon: LayoutList
        }, {
          label: 'Open summary',
          to: '/doctor/patients/PT-1042',
          icon: ClipboardList
        }, {
          label: 'View timeline',
          to: '/doctor/patients/PT-1042/timeline',
          icon: ArrowRight
        }, {
          label: 'Add medical event',
          to: '/doctor/patients/PT-1042/add-event',
          icon: FilePlus2
        }].map(action => {
          const Icon = action.icon;
          return <Link to={action.to} className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-teal-50" key={action.label}><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">{action.label}</p><p className="mt-1 text-xs text-slate-500">Existing doctor route</p></div><Icon className="h-5 w-5 text-teal-700" /></div></Link>;
        })}</div></DashboardWidget><section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><DashboardWidget title="Recent patients" description="Open a patient summary or timeline to continue care review."><div className="space-y-4">{recentPatients.map(patient => <Link to={patient.summaryRoute} className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white" key={patient.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm uppercase tracking-[0.18em] text-teal-700">{patient.id}</p><h2 className="text-xl font-semibold text-slate-900">{patient.name}</h2><p className="mt-1 text-sm text-slate-600">{patient.activeProblem}</p></div><Button size="sm" variant="outline" type="button">Review summary</Button></div><p className="mt-3 text-sm text-slate-500">{patient.lastEncounter}</p></Link>)}</div></DashboardWidget><DashboardWidget title="Clinical priorities" description="Review the most important follow-up tasks for today."><div className="space-y-3">{clinicalTasks.map(task => <Link to={task.summaryRoute} className={`block rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${task.tone === 'warning' ? 'border-amber-200 bg-amber-50 hover:bg-amber-100' : task.tone === 'success' ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100' : 'border-sky-200 bg-sky-50 hover:bg-sky-100'}`} key={task.id}><p className="text-sm font-semibold text-slate-900">{task.title}</p><p className="mt-1 text-sm text-slate-600">{task.detail}</p></Link>)}</div></DashboardWidget></section><DashboardWidget title="Recent clinical activity" description="A brief snapshot of the most recent doctor workflow activity."><div className="space-y-4">{recentClinicalActivity.map(item => <Link to={item.timelineRoute} className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white" key={item.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.type}</p><h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.summary}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">{item.timestamp}</span></div></Link>)}</div></DashboardWidget></div>;
}
