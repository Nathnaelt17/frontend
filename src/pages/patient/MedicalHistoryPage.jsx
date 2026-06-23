import { useEffect, useMemo, useState } from 'react';
import { FileText, QrCode, Download, Activity, User, FileStack, Search } from 'lucide-react';
import QRCodeLib from 'qrcode';
import jsPDF from 'jspdf';

import { patientTimelineEvents } from '../../features/timeline/data/timelineData';
import { TimelineEventCard } from '../../features/timeline/components/TimelineEventCard';
import { TimelineFilterBar } from '../../features/timeline/components/TimelineFilterBar';

const demoProfiles = {
  '123456789012': {
    full_name: 'Abebe Kebede',
    fayda_id: '123456789012',
    blood_type: 'O+',
    allergies: 'Zinc, Iron supplements',
    chronic_conditions: 'Hypertension',
    emergency_contact_name: 'Tigist Kebede',
    emergency_contact_phone: '+251911234568'
  },
  '987654321098': {
    full_name: 'Selamawit Tesfaye',
    fayda_id: '987654321098',
    blood_type: 'AB-',
    allergies: 'Penicillin, Tree nuts',
    chronic_conditions: 'Previous Right Arm Fracture (resolved)',
    emergency_contact_name: 'Yohannes Tesfaye',
    emergency_contact_phone: '+251922345679'
  }
};

export function MedicalHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const [timelineFilter, setTimelineFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [userProfile, setUserProfile] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const storedUser = useMemo(() => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }, []);

  const filteredTimeline = useMemo(() => {
    let events = patientTimelineEvents;

    // TYPE FILTER
    if (timelineFilter !== 'All') {
      events = events.filter(e => e.type === timelineFilter);
    }

    // SEARCH FILTER
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      events = events.filter(e =>
        e.title?.toLowerCase().includes(q) ||
        e.summary?.toLowerCase().includes(q) ||
        e.clinician?.toLowerCase().includes(q) ||
        e.facility?.toLowerCase().includes(q) ||
        e.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return events;
  }, [timelineFilter, searchQuery]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        if (!storedUser) return;

        const faydaId =
          storedUser.fayda_id ||
          storedUser.email?.split('@')[0] ||
          'unknown';

        const profile =
          demoProfiles[faydaId] || {
            full_name: storedUser.email || 'Patient',
            fayda_id: faydaId,
            blood_type: 'N/A'
          };

        setUserProfile(profile);

        const qrData = JSON.stringify({
          name: profile.full_name,
          faydaId: profile.fayda_id,
          bloodType: profile.blood_type,
          allergies: profile.allergies,
          chronicConditions: profile.chronic_conditions,
          emergencyContact: profile.emergency_contact_name,
          emergencyPhone: profile.emergency_contact_phone
        });

        const qr = await QRCodeLib.toDataURL(qrData, { width: 250 });
        setQrCodeUrl(qr);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [storedUser]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Medical History', 20, 20);

    if (userProfile) {
      doc.setFontSize(11);
      doc.text(`Name: ${userProfile.full_name}`, 20, 35);
      doc.text(`Fayda ID: ${userProfile.fayda_id}`, 20, 42);
    }

    let y = 65;

    patientTimelineEvents.forEach((e, i) => {
      doc.setFontSize(10);
      doc.text(`${i + 1}. ${e.title}`, 20, y);
      y += 6;
      doc.text(`${e.type} - ${e.occurredAt}`, 25, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('medical-history.pdf');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-500" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'timeline', label: 'Timeline', icon: Activity },
    { id: 'labs', label: 'Lab Results', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FileStack }
  ];

  const labResults = patientTimelineEvents.filter(
    e => e.type === 'Lab Result Uploaded'
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Medical History</h1>
            <p className="text-sm text-white/80">Complete clinical record</p>
          </div>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold hover:bg-white/30"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* QR */}
      {qrCodeUrl && (
        <div className="rounded-xl border bg-white p-4">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <QrCode size={18} />
            Medical QR Access
          </div>

          <img src={qrCodeUrl} className="h-40 w-40" />
        </div>
      )}

      {/* TABS */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                activeTab === t.id
                  ? 'border-blue-600 text-white shadow-md'
                  : 'border border-slate-200 bg-blue text-slate-700 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && userProfile && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-3 font-semibold">Patient Information</h3>
            <p className="text-sm">{userProfile.full_name}</p>
            <p className="text-sm">{userProfile.blood_type}</p>
          </div>
        </div>
      )}

      {/* TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">

          {/* SEARCH + FILTER BAR (Prescriptions style) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* SEARCH */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 lg:w-[420px]">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search timeline (doctor, diagnosis, hospital...)"
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                />
              </div>

              {/* FILTER */}
              <TimelineFilterBar
                activeType={timelineFilter}
                onChange={setTimelineFilter}
              />
            </div>
          </div>

          {/* EVENTS */}
          <div className="space-y-4">
            {filteredTimeline.map(event => (
              <TimelineEventCard
                key={event.id}
                event={event}
                view="patient"
                onOpen={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      )}

      {/* LABS */}
      {activeTab === 'labs' && (
        <div className="space-y-3">
          {labResults.map(e => (
            <div key={e.id} className="rounded-lg border bg-white p-4">
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-500">{e.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
          Documents module ready for backend integration
        </div>
      )}

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-[90%] max-w-md rounded-xl bg-white p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-bold">{selectedEvent.title}</h3>
            <p className="mt-2 text-sm">{selectedEvent.summary}</p>
            <button
              className="mt-4 text-sm text-blue-600"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalHistoryPage;