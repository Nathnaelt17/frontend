import { useState, useEffect } from 'react';
import { FileText, QrCode, X, Eye } from 'lucide-react';
import QRCodeLib from 'qrcode';
import jsPDF from 'jspdf';

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

const demoMedicalHistory = {
  '123456789012': [],
  '987654321098': []
};

export function MedicalHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const mergeRecords = (base, local) => {
    const seen = new Set();
    return [...local, ...base]
      .filter(r => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      })
      .sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const storageKey = `medical_records_${storedUser.id}`;

    const getFaydaId = () => {
      if (storedUser.fayda_id) return storedUser.fayda_id;
      return storedUser.email?.split('@')[0] || '';
    };

    const loadMedicalHistory = async () => {
      try {
        setLoading(true);

        const localRecords = JSON.parse(
          localStorage.getItem(storageKey) || '[]'
        );

        const faydaId = getFaydaId();

        const profile =
          JSON.parse(localStorage.getItem('users') || '[]')
            .find(u => u.id === storedUser.id) ||
          demoProfiles[faydaId] || {
            full_name: storedUser.email || 'Patient',
            fayda_id: faydaId
          };

        setUserProfile(profile);

        const baseRecords = demoMedicalHistory[faydaId] || [];
        const merged = mergeRecords(baseRecords, localRecords);

        setRecords(merged);

        const qrData = JSON.stringify({
          name: profile.full_name,
          faydaId: profile.fayda_id,
          bloodType: profile.blood_type,
          allergies: profile.allergies,
          chronicConditions: profile.chronic_conditions,
          emergencyContact: profile.emergency_contact_name,
          emergencyPhone: profile.emergency_contact_phone
        });

        const qr = await QRCodeLib.toDataURL(qrData, { width: 300 });
        setQrCodeUrl(qr);

      } catch (err) {
        console.error('Medical history load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMedicalHistory();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Medical Records', 20, 20);

    if (userProfile) {
      doc.setFontSize(11);
      doc.text(`Name: ${userProfile.full_name}`, 20, 35);
      doc.text(`Fayda ID: ${userProfile.fayda_id}`, 20, 42);
      doc.text(`Blood Type: ${userProfile.blood_type || 'N/A'}`, 20, 49);
    }

    let y = 70;

    records.forEach((r, i) => {
      doc.text(`${i + 1}. ${r.hospital_name}`, 20, y);
      y += 6;

      doc.text(`Doctor: ${r.doctor_name}`, 25, y);
      y += 6;

      doc.text(`Date: ${r.visit_date}`, 25, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('medical-records.pdf');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-10 w-10 border-b-2 border-gray-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">
        <div className="flex items-center gap-3">
          <FileText />
          <h1 className="text-xl font-bold">Medical Records</h1>
        </div>
      </div>

      {/* QR */}
      {qrCodeUrl && (
        <div className="bg-white p-4 rounded-xl border">
          <h2 className="flex items-center gap-2 font-semibold mb-3">
            <QrCode size={18} />
            Medical QR
          </h2>

          <img src={qrCodeUrl} className="w-40 h-40" />

          <button
            onClick={downloadPDF}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* RECORDS */}
      <div className="space-y-4">
        {records.length === 0 ? (
          <p>No records found</p>
        ) : (
          records.map(r => (
            <div key={r.id} className="p-4 bg-white border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{r.doctor_name}</p>
                  <p className="text-sm text-gray-500">{r.hospital_name}</p>
                </div>

                <button onClick={() => setSelectedRecord(r)}>
                  <Eye size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">{r.visit_date}</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedRecord && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[90%] max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecord(null)}
              className="float-right"
            >
              <X />
            </button>

            <h2 className="font-bold mb-2">
              {selectedRecord.doctor_name}
            </h2>

            <p className="text-sm">
              {selectedRecord.diagnosis}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalHistoryPage;