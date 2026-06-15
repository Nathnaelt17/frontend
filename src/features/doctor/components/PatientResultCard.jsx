import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/Card';
export function PatientResultCard({
  patient
}) {
  const navigate = useNavigate();
  return <Card className="h-full transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle>{patient.name}</CardTitle><p className="mt-1 text-sm text-slate-500">{patient.condition}</p></div><Badge>{patient.status}</Badge></div></CardHeader><CardContent className="space-y-3 text-sm text-slate-700"><div className="grid gap-3 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Patient ID</p><p className="mt-1 font-semibold text-slate-900">{patient.id}</p></div><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Hospital</p><p className="mt-1 font-semibold text-slate-900">{patient.hospital}</p></div><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Age</p><p className="mt-1 font-semibold text-slate-900">{patient.age} yrs</p></div><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Gender</p><p className="mt-1 font-semibold text-slate-900">{patient.gender}</p></div></div><div><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Visit</p><p className="mt-1 font-semibold text-slate-900">{patient.lastVisit}</p></div></CardContent><CardFooter className="flex flex-wrap gap-2 border-t border-slate-100 pt-4"><Button variant="outline" size="sm" onClick={() => navigate(`/doctor/patients/${patient.id}`)}>View Profile</Button><Button size="sm" onClick={() => navigate(`/doctor/patients/${patient.id}/timeline`)}>View Timeline</Button></CardFooter></Card>;
}
