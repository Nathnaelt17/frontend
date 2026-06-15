import { Navigate, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  const medicalData = {
  blood_type: user.blood_type || 'O+',
  insurance_type: user.insurance_type || 'CBHI',
  allergies:
    user.allergies?.length
      ? user.allergies.join(', ')
      : 'Penicillin, Peanuts',
  conditions:
    user.conditions?.length
      ? user.conditions.join(', ')
      : 'Hypertension'
};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3">
          <User size={32} />

          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="text-blue-100">
              View your account and medical information.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InfoField
            label="Full Name"
            value={user.full_name || 'Not Available'}
          />

          <InfoField
            label="Email"
            value={user.email || 'Not Available'}
          />

          <InfoField
            label="Fayda ID"
            value={user.fayda_id || 'Not Available'}
          />

          <InfoField
            label="Phone Number"
            value={user.phone || 'Not Available'}
          />

          <InfoField
            label="Role"
            value={user.role || 'Not Available'}
          />

          <InfoField
            label="Member Since"
            value={
              user.created_at
                ? new Date(
                    user.created_at
                  ).toLocaleDateString()
                : 'Not Available'
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Medical Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InfoField
  label="Blood Type"
  value={medicalData.blood_type}
/>

<InfoField
  label="Insurance Type"
  value={medicalData.insurance_type}
/>

<InfoField
  label="Allergies"
  value={medicalData.allergies}
/>

<InfoField
  label="Medical Conditions"
  value={medicalData.conditions}
/>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Account
        </h2>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-1">
        {label}
      </p>

      <div className="border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
        {value}
      </div>
    </div>
  );
}

export default ProfilePage;