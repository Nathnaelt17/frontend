import { createContext, useContext, useState } from 'react';
import { saveUser } from '../../utils/savedUsers';
import { ROLES } from '../../constants/roles';

const AuthContext = createContext(null);

const getInitialSession = () => {
  try {
    const saved = localStorage.getItem('session');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const normalizeRole = (role) => {
  const value = String(role || '').toLowerCase().trim();

  switch (value) {
    case 'doctor':
      return ROLES.DOCTOR;

    case 'admin':
    case 'hospital_admin':
      return ROLES.HOSPITAL_ADMIN;

    case 'super_admin':
      return ROLES.SUPER_ADMIN;

    case 'patient':
      return ROLES.PATIENT;

    default:
      console.warn('Unknown role detected:', role);
      return ROLES.PATIENT;
  }
};

const normalizeUser = (user) => ({
  ...user,
  name:
    user.full_name ||
    user.name ||
    user.email ||
    user.fayda_id,
  role: normalizeRole(user.role)
});

export function AuthProvider({ children }) {
  const initialSession = getInitialSession();

  const initialUser = initialSession?.user
    ? normalizeUser(initialSession.user)
    : null;

  const [user, setUser] = useState(initialUser);

  const [session, setSession] = useState(
    initialSession
      ? {
          ...initialSession,
          user: initialUser
        }
      : null
  );

  const [isLoading] = useState(false);

  const signIn = async (identifier, password) => {
    try {
      const users = JSON.parse(
        localStorage.getItem('users') || '[]'
      );

      const foundUser = users.find(
        (u) =>
          (u.email === identifier ||
            u.fayda_id === identifier) &&
          u.password === password
      );

      if (!foundUser) {
        return {
          error: {
            message:
              'Invalid email/Fayda ID or password'
          }
        };
      }

      const normalizedUser =
        normalizeUser(foundUser);

      const sessionData = {
        user: normalizedUser,
        access_token: 'local-session'
      };

      localStorage.setItem(
        'session',
        JSON.stringify(sessionData)
      );

      setUser(normalizedUser);
      setSession(sessionData);

      saveUser({
        id: normalizedUser.id,
        email: normalizedUser.email,
        name: normalizedUser.name,
        faydaId: normalizedUser.fayda_id,
        lastLogin: new Date().toISOString()
      });

      return {
        error: null,
        user: normalizedUser
      };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('session');
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}