import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/shared/Logo';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FiAlertCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { ROLES } from '../../constants/roles';

export function RegisterPage() {
  const navigate = useNavigate();

  const [faydaId, setFaydaId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError(null);
    setIsLoading(true);

    if (faydaId.length !== 12) {
      setError('Fayda ID must be exactly 12 digits');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const users = JSON.parse(
        localStorage.getItem('users') || '[]'
      );

      const existingUser = users.find(
        (user) =>
          user.fayda_id === faydaId ||
          user.email === email
      );

      if (existingUser) {
        setError(
          'An account with this Fayda ID or email already exists.'
        );
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        fayda_id: faydaId,
        email,
        password,
        role: ROLES.PATIENT,
        created_at: new Date().toISOString()
      };

      users.push(newUser);

      localStorage.setItem(
        'users',
        JSON.stringify(users)
      );

      setSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);

      setError(
        'An unexpected error occurred. Please try again.'
      );

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-neutral-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="relative mb-8">
            <div className="absolute left-0 top-0">
              <Link
                to="/login"
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors inline-block"
              >
                <FiArrowLeft
                  size={20}
                  className="text-neutral-600"
                />
              </Link>
            </div>

            <div className="flex justify-center">
              <Logo
                size={56}
                variant="dark"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">
            Create Account
          </h1>

          <p className="text-center text-neutral-600 text-sm mb-8">
            Register using your Fayda ID
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <FiAlertCircle
                size={18}
                className="text-red-600 mt-0.5 flex-shrink-0"
              />
              <p className="text-red-700 text-sm">
                {error}
              </p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <FiCheckCircle
                size={18}
                className="text-green-600 mt-0.5 flex-shrink-0"
              />
              <p className="text-green-700 text-sm">
                Registration successful! Redirecting to login...
              </p>
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Fayda ID
                <span className="text-red-500"> *</span>
              </label>

              <Input
                type="text"
                value={faydaId}
                onChange={(e) =>
                  setFaydaId(
                    e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 12)
                  )
                }
                required
                maxLength={12}
                placeholder="123456789012"
              />

              <p className="text-xs text-neutral-500 mt-1">
                Enter your official 12-digit Fayda ID
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
                <span className="text-red-500"> *</span>
              </label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
                <span className="text-red-500"> *</span>
              </label>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={8}
                placeholder="Enter your password"
              />

              <p className="text-xs text-neutral-500 mt-1">
                Minimum 8 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full"
            >
              {isLoading
                ? 'Creating Account...'
                : 'Register'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;