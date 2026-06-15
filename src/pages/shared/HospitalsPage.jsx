import { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Filter,
  Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HOSPITALS = [
  {
    id: 'et1',
    name: 'Black Lion (Tikur Anbessa)',
    specialty: 'General',
    wait_time: 45,
    address: 'Churchill Ave, Addis Ababa',
    contact: '011 551 1211',
    icu_available: true,
    lab_available: true,
    pharmacy_available: true,
    radiology_available: true,
    ambulance_access: true
  },
  {
    id: 'et2',
    name: 'St. Paul’s Hospital',
    specialty: 'General',
    wait_time: 50,
    address: 'Swaziland St, Addis Ababa',
    contact: '011 275 0125',
    icu_available: true,
    lab_available: true,
    pharmacy_available: true,
    radiology_available: true,
    ambulance_access: true
  },
  {
    id: 'et3',
    name: 'Zewditu Memorial',
    specialty: 'General',
    wait_time: 30,
    address: 'Near Filwoha, Addis Ababa',
    contact: '011 551 8085',
    lab_available: true,
    pharmacy_available: true
  },
  {
    id: 'et5',
    name: 'Korean General (MyungSung)',
    specialty: 'General',
    wait_time: 20,
    address: 'Gerji, Addis Ababa',
    contact: '011 629 2963',
    icu_available: true,
    lab_available: true,
    radiology_available: true,
    glucose_available: true
  },
  {
    id: 'et7',
    name: 'Bethzatha Hospital',
    specialty: 'General',
    wait_time: 12,
    address: 'Stadium Area, Addis Ababa',
    contact: '091 121 4141',
    lab_available: true,
    pharmacy_available: true
  },
  {
    id: 'et8',
    name: 'Yekatit 12 Hospital',
    specialty: 'Pediatrics',
    wait_time: 40,
    address: '6 Kilo, Addis Ababa',
    contact: '011 155 3065',
    icu_available: true,
    lab_available: true
  },
  {
    id: 'et9',
    name: 'Hayat Hospital',
    specialty: 'Cardiology',
    wait_time: 25,
    address: 'Bole, Addis Ababa',
    contact: '011 662 4488',
    icu_available: true,
    radiology_available: true,
    ambulance_access: true
  },
  {
    id: 'et11',
    name: 'Addis Hiwot General',
    specialty: 'General',
    wait_time: 18,
    address: 'Bole, Addis Ababa',
    contact: '011 662 3922',
    lab_available: true,
    pharmacy_available: true
  },
  {
    id: 'et12',
    name: 'Kadisco General',
    specialty: 'Neurology',
    wait_time: 30,
    address: 'Gerji area, Addis Ababa',
    contact: '011 629 8904',
    icu_available: true,
    radiology_available: true
  },
  {
    id: 'repl_1',
    name: 'Atlas General Hospital',
    specialty: 'General',
    wait_time: 14,
    address: 'Bole, Near Atlas Hotel',
    contact: '011 661 3535',
    glucose_available: true,
    lab_available: true
  },
  {
    id: 'repl_2',
    name: 'Hallelujah General',
    specialty: 'General',
    wait_time: 20,
    address: 'Gotera, Addis Ababa',
    contact: '8188',
    icu_available: true,
    radiology_available: true
  },
  {
    id: 'repl_3',
    name: 'Africana Dental Center',
    specialty: 'Dentistry',
    wait_time: 10,
    address: 'Piassa, Addis Ababa',
    contact: '011 156 7890',
    lab_available: true
  },
  {
    id: 'repl_4',
    name: 'Heart Center Ethiopia',
    specialty: 'Cardiology',
    wait_time: 20,
    address: 'Tikur Anbessa Compound',
    contact: '011 558 1234',
    icu_available: true,
    ambulance_access: true
  },
  {
    id: 'repl_5',
    name: 'Abay Children’s Clinic',
    specialty: 'Pediatrics',
    wait_time: 15,
    address: 'Gurd Shola Area',
    contact: '011 647 8899',
    lab_available: true
  },
  {
    id: 'repl_6',
    name: 'Blue Health Specialized',
    specialty: 'Neurology',
    wait_time: 30,
    address: 'Kality Area',
    contact: '011 439 2211',
    radiology_available: true
  }
];

export function HospitalsPage() {
  const navigate = useNavigate();

  const hospitals = HOSPITALS;
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityMenuOpen, setFacilityMenuOpen] = useState(false);
  const [specialtyMenuOpen, setSpecialtyMenuOpen] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState('All');

  const advancedFilters = {
    glucose: false,
    shortWait: false,
    icu: false,
    lab: false,
    pharmacy: false,
    radiology: false,
    ambulance: false
  };

  const specialties = [
    'All',
    'General',
    'Dentistry',
    'Cardiology',
    'Pediatrics',
    'Orthopedics',
    'Neurology'
  ];

  const getFilteredHospitals = () => {
    return hospitals
      .filter(h => {
        const search = searchQuery.toLowerCase().trim();

        const matchesSearch = (h.name || '').toLowerCase().includes(search);
        const matchesSpecialty =
          activeSpecialty === 'All' || h.specialty === activeSpecialty;

        const matchesGlucose =
          !advancedFilters.glucose || !!h.glucose_available;
        const matchesWait =
          !advancedFilters.shortWait || (h.wait_time ?? 999) <= 15;
        const matchesICU = !advancedFilters.icu || !!h.icu_available;
        const matchesLab = !advancedFilters.lab || !!h.lab_available;
        const matchesPharmacy =
          !advancedFilters.pharmacy || !!h.pharmacy_available;
        const matchesRadiology =
          !advancedFilters.radiology || !!h.radiology_available;
        const matchesAmbulance =
          !advancedFilters.ambulance || !!h.ambulance_access;

        return (
          matchesSearch &&
          matchesSpecialty &&
          matchesGlucose &&
          matchesWait &&
          matchesICU &&
          matchesLab &&
          matchesPharmacy &&
          matchesRadiology &&
          matchesAmbulance
        );
      })
      .sort((a, b) => {
        const search = searchQuery.toLowerCase().trim();

        if (search !== '') {
          const aStarts = a.name.toLowerCase().startsWith(search);
          const bStarts = b.name.toLowerCase().startsWith(search);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
        }

        return a.name.localeCompare(b.name);
      });
  };

  const finalHospitals = getFilteredHospitals();

  return (
    <div className="space-y-6">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-[50%]">
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setSpecialtyMenuOpen(!specialtyMenuOpen);
                setFacilityMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg bg-[#7cb955] text-white flex items-center gap-2 text-sm font-medium h-10"
            >
              <Stethoscope size={16} />
              <span>{activeSpecialty}</span>
            </button>

            {specialtyMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-xl shadow-xl z-30 p-2">
                {specialties.map(spec => (
                  <button
                    key={spec}
                    onClick={() => {
                      setActiveSpecialty(spec);
                      setSpecialtyMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-neutral-100"
                  >
                    {spec}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-3 py-2 rounded-lg bg-[#7cb955] text-white h-10"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setFacilityMenuOpen(!facilityMenuOpen);
            setSpecialtyMenuOpen(false);
          }}
          className="px-4 py-2 rounded-lg bg-[#7cb955] text-white flex items-center gap-2 h-10"
        >
          <Filter size={16} />
          Facilities
        </button>
      </div>

      {/* HOSPITAL LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalHospitals.map(hospital => (
          <div
            key={hospital.id}
            className="p-6 bg-white rounded-xl border space-y-3"
          >
            <h3 className="font-semibold text-lg">{hospital.name}</h3>

            <p className="text-sm">
              <Clock size={14} /> {hospital.wait_time} mins
            </p>

            <p className="text-sm">
              <Phone size={14} /> {hospital.contact}
            </p>

            <p className="text-sm">
              <MapPin size={14} /> {hospital.address}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/map?lat=${hospital.lat || 9.03}&lng=${
                    hospital.lng || 38.74
                  }`
                )
              }
              className="text-xs bg-green-100 px-3 py-1 rounded"
            >
              View on Map
            </button>
          </div>
        ))}
      </div>

      {finalHospitals.length === 0 && (
        <div className="text-center py-10">
          <p>No hospitals found.</p>
        </div>
      )}
    </div>
  );
}