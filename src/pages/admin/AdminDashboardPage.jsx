import { useEffect, useState } from 'react';
import { AlertCircle, Droplet, Truck } from 'lucide-react';
import { useLanguage } from '../../app/providers/LanguageContext';

export function AdminDashboardPage() {
  const { t } = useLanguage();

  const defaultHospitals = [
    {
      id: '1',
      name: 'General Hospital',
      contact: '+251900000001',
      wait_time: 15,
      oxygen_status: true,
      lat: 9.032,
      lng: 38.746
    },
    {
      id: '2',
      name: 'City Medical Center',
      contact: '+251900000002',
      wait_time: 25,
      oxygen_status: false,
      lat: 9.045,
      lng: 38.758
    }
  ];

  const defaultAmbulances = [
    {
      id: '1',
      driver_name: 'John Doe',
      current_lat: 9.034,
      current_lng: 38.750,
      status: 'available'
    },
    {
      id: '2',
      driver_name: 'Jane Smith',
      current_lat: 9.050,
      current_lng: 38.765,
      status: 'busy'
    }
  ];

  const defaultAlerts = [
    {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      user_coords: {
        lat: 9.032,
        lng: 38.746
      }
    }
  ];

  const [hospitals, setHospitals] = useState(() => {
    const storedHospitals = localStorage.getItem('hospitals');
    return storedHospitals
      ? JSON.parse(storedHospitals)
      : defaultHospitals;
  });

  const [ambulances] = useState(() => {
    const storedAmbulances = localStorage.getItem('ambulances');
    return storedAmbulances
      ? JSON.parse(storedAmbulances)
      : defaultAmbulances;
  });

  const [alerts] = useState(() => {
    const storedAlerts = localStorage.getItem('emergency_alerts');
    return storedAlerts
      ? JSON.parse(storedAlerts)
      : defaultAlerts;
  });

  const [editingHospitalId, setEditingHospitalId] = useState(null);
  const [editingWaitTime, setEditingWaitTime] = useState(0);
  const isLoading = false;

  useEffect(() => {
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem('ambulances', JSON.stringify(ambulances));
  }, [ambulances]);

  useEffect(() => {
    localStorage.setItem('emergency_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const handleUpdateWaitTime = (hospitalId, newWaitTime) => {
    setHospitals(prev =>
      prev.map(hospital =>
        hospital.id === hospitalId
          ? { ...hospital, wait_time: newWaitTime }
          : hospital
      )
    );

    setEditingHospitalId(null);
    setEditingWaitTime(0);
  };

  const toggleOxygenStatus = (hospitalId, currentStatus) => {
    setHospitals(prev =>
      prev.map(hospital =>
        hospital.id === hospitalId
          ? {
              ...hospital,
              oxygen_status: !currentStatus
            }
          : hospital
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-600">
          {t('common.loading')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('admin.title')}
        </h1>

        <p className="text-neutral-600">
          Manage hospitals, ambulances, and emergency alerts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Total Hospitals
              </p>

              <p className="text-2xl font-bold text-neutral-900">
                {hospitals.length}
              </p>
            </div>

            <AlertCircle
              className="text-teal-600"
              size={32}
            />
          </div>
        </div>

        <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Active Ambulances
              </p>

              <p className="text-2xl font-bold text-neutral-900">
                {
                  ambulances.filter(
                    a => a.status === 'available'
                  ).length
                }
              </p>
            </div>

            <Truck
              className="text-teal-600"
              size={32}
            />
          </div>
        </div>

        <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                Pending Alerts
              </p>

              <p className="text-2xl font-bold text-neutral-900">
                {
                  alerts.filter(
                    a => a.status === 'pending'
                  ).length
                }
              </p>
            </div>

            <AlertCircle
              className="text-red-600"
              size={32}
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          {t('admin.hospitalManagement')}
        </h2>

        <div className="space-y-4">
          {hospitals.map(hospital => (
            <div
              key={hospital.id}
              className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {hospital.name}
                  </h3>

                  <p className="text-sm text-neutral-600 mt-1">
                    {hospital.contact}
                  </p>
                </div>

                <button
                  onClick={() =>
                    toggleOxygenStatus(
                      hospital.id,
                      hospital.oxygen_status
                    )
                  }
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    hospital.oxygen_status
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Droplet
                    className="inline mr-1"
                    size={14}
                  />

                  {hospital.oxygen_status
                    ? 'Available'
                    : 'Not Available'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('admin.updateWaitTime')}
                  </label>

                  {editingHospitalId === hospital.id ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={editingWaitTime}
                        onChange={e =>
                          setEditingWaitTime(
                            Number(e.target.value)
                          )
                        }
                        className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg"
                      />

                      <button
                        onClick={() =>
                          handleUpdateWaitTime(
                            hospital.id,
                            editingWaitTime
                          )
                        }
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                      >
                        {t('admin.save')}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-neutral-900">
                        {hospital.wait_time}
                      </span>

                      <span className="text-neutral-600">
                        {t('admin.minutes')}
                      </span>

                      <button
                        onClick={() => {
                          setEditingHospitalId(
                            hospital.id
                          );
                          setEditingWaitTime(
                            hospital.wait_time
                          );
                        }}
                        className="ml-auto px-3 py-1 bg-neutral-200 rounded-lg"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">
                    Location
                  </p>

                  <p className="text-neutral-600 text-sm">
                    {hospital.lat.toFixed(4)},
                    {' '}
                    {hospital.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambulances */}
      <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          {t('admin.ambulanceManagement')}
        </h2>

        <div className="space-y-4">
          {ambulances.map(ambulance => (
            <div
              key={ambulance.id}
              className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {ambulance.driver_name}
                  </h3>

                  <p className="text-sm text-neutral-600 mt-1">
                    {ambulance.current_lat.toFixed(4)},
                    {' '}
                    {ambulance.current_lng.toFixed(4)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    ambulance.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {ambulance.status === 'available'
                    ? 'Available'
                    : 'Busy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="p-6 bg-white rounded-bento shadow-bento border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          Recent Emergency Alerts
        </h2>

        <div className="space-y-4">
          {alerts.length === 0 ? (
            <p className="text-neutral-600">
              No emergency alerts
            </p>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.id}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Alert #{alert.id.slice(0, 8)}
                    </p>

                    <p className="text-sm text-neutral-600 mt-1">
                      {new Date(
                        alert.timestamp
                      ).toLocaleString()}
                    </p>

                    <p className="text-sm text-neutral-600 mt-1">
                      Location:{' '}
                      {alert.user_coords.lat.toFixed(4)},
                      {' '}
                      {alert.user_coords.lng.toFixed(4)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                      alert.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : alert.status ===
                          'dispatched'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
