import { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Plus,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Ambulance,
  Pencil,
  Trash2
} from 'lucide-react';

const DEFAULT_HOSPITALS = [
  {
    id: crypto.randomUUID(),
    name: 'Black Lion Hospital',
    specialty: 'General',
    wait_time: 45,
    address: 'Addis Ababa',
    contact: '0115511211',
    icu_available: true,
    ambulance_access: true,
    active: true
  },
  {
    id: crypto.randomUUID(),
    name: 'St. Paul Hospital',
    specialty: 'General',
    wait_time: 30,
    address: 'Addis Ababa',
    contact: '0112750125',
    icu_available: true,
    ambulance_access: true,
    active: true
  }
];

export function SuperAdminHospitalsPage() {
  const [hospitals, setHospitals] = useState(() => {
    const stored = localStorage.getItem('hospitals');

    if (stored) {
      return JSON.parse(stored);
    }

    return DEFAULT_HOSPITALS;
  });

  const [showForm, setShowForm] = useState(false);

  const [newHospital, setNewHospital] = useState({
    name: '',
    specialty: '',
    address: '',
    contact: '',
    wait_time: 15
  });

  useEffect(() => {
    localStorage.setItem(
      'hospitals',
      JSON.stringify(hospitals)
    );
  }, [hospitals]);

  const stats = useMemo(() => {
    const activeHospitals = hospitals.filter(
      h => h.active !== false
    );

    const icuHospitals = hospitals.filter(
      h => h.icu_available
    );

    const ambulanceHospitals = hospitals.filter(
      h => h.ambulance_access
    );

    const averageWait =
      hospitals.length > 0
        ? Math.round(
            hospitals.reduce(
              (sum, h) => sum + (h.wait_time || 0),
              0
            ) / hospitals.length
          )
        : 0;

    return {
      total: hospitals.length,
      active: activeHospitals.length,
      icu: icuHospitals.length,
      ambulance: ambulanceHospitals.length,
      averageWait
    };
  }, [hospitals]);

  const handleAddHospital = () => {
    if (!newHospital.name.trim()) return;

    const hospital = {
      id: crypto.randomUUID(),
      ...newHospital,
      active: true,
      icu_available: false,
      ambulance_access: false
    };

    setHospitals(prev => [...prev, hospital]);

    setNewHospital({
      name: '',
      specialty: '',
      address: '',
      contact: '',
      wait_time: 15
    });

    setShowForm(false);
  };

  const toggleStatus = hospitalId => {
    setHospitals(prev =>
      prev.map(h =>
        h.id === hospitalId
          ? {
              ...h,
              active: !h.active
            }
          : h
      )
    );
  };

  const deleteHospital = hospitalId => {
    if (
      !window.confirm(
        'Delete this hospital?'
      )
    ) {
      return;
    }

    setHospitals(prev =>
      prev.filter(h => h.id !== hospitalId)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Hospital Management
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all hospitals across the
            platform.
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Hospital
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Hospitals"
          value={stats.total}
          icon={Building2}
        />

        <StatCard
          title="Active"
          value={stats.active}
          icon={ShieldCheck}
        />

        <StatCard
          title="ICU Available"
          value={stats.icu}
          icon={ShieldCheck}
        />

        <StatCard
          title="Ambulance Access"
          value={stats.ambulance}
          icon={Ambulance}
        />

        <StatCard
          title="Avg Wait"
          value={`${stats.averageWait}m`}
          icon={Clock}
        />
      </div>

      {/* Add Hospital Form */}
      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            Add Hospital
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Hospital Name"
              value={newHospital.name}
              onChange={e =>
                setNewHospital({
                  ...newHospital,
                  name: e.target.value
                })
              }
              className="rounded-lg border p-3"
            />

            <input
              placeholder="Specialty"
              value={newHospital.specialty}
              onChange={e =>
                setNewHospital({
                  ...newHospital,
                  specialty: e.target.value
                })
              }
              className="rounded-lg border p-3"
            />

            <input
              placeholder="Address"
              value={newHospital.address}
              onChange={e =>
                setNewHospital({
                  ...newHospital,
                  address: e.target.value
                })
              }
              className="rounded-lg border p-3"
            />

            <input
              placeholder="Contact"
              value={newHospital.contact}
              onChange={e =>
                setNewHospital({
                  ...newHospital,
                  contact: e.target.value
                })
              }
              className="rounded-lg border p-3"
            />
          </div>

          <button
            onClick={handleAddHospital}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
          >
            Save Hospital
          </button>
        </div>
      )}

      {/* Hospitals */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {hospitals.map(hospital => (
          <div
            key={hospital.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {hospital.name}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  hospital.active !== false
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {hospital.active !== false
                  ? 'Active'
                  : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                {hospital.address}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} />
                {hospital.contact}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={14} />
                {hospital.wait_time} min wait
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() =>
                  toggleStatus(hospital.id)
                }
                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white"
              >
                {hospital.active !== false
                  ? 'Disable'
                  : 'Enable'}
              </button>

              <button className="rounded-lg bg-blue-600 px-3 py-2 text-white">
                <Pencil size={16} />
              </button>

              <button
                onClick={() =>
                  deleteHospital(
                    hospital.id
                  )
                }
                className="rounded-lg bg-red-600 px-3 py-2 text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon
          size={24}
          className="text-blue-600"
        />

        <span className="text-3xl font-bold">
          {value}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-600">
        {title}
      </p>
    </div>
  );
}

export default SuperAdminHospitalsPage;