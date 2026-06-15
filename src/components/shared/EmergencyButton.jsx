import { useState, useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../../app/providers/LanguageContext';

export function EmergencyButton() {
  const { t } = useLanguage();

  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const handleStart = () => {
    setIsHolding(true);
    setProgress(0);
    setError(null);

    let currentProgress = 0;

    progressRef.current = setInterval(() => {
      currentProgress += 10;
      setProgress(Math.min(currentProgress, 100));
    }, 100);

    timerRef.current = setTimeout(() => {
      setProgress(100);
      triggerSOS();
    }, 1000);
  };

  const handleStop = () => {
    setIsHolding(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (progressRef.current) {
      clearInterval(progressRef.current);
    }

    if (progress < 100) {
      setProgress(0);
    }
  };

  const triggerSOS = async () => {
    setIsLoading(true);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { timeout: 10000 }
        );
      });

      const alerts = JSON.parse(
        localStorage.getItem('emergency_alerts') || '[]'
      );

      const emergencyAlert = {
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(),
        latitude: position.latitude,
        longitude: position.longitude,
        status: 'pending',
        eta: 7,
        createdAt: new Date().toISOString()
      };

      alerts.push(emergencyAlert);

      localStorage.setItem(
        'emergency_alerts',
        JSON.stringify(alerts)
      );

      console.log('Emergency alert saved locally:', emergencyAlert);

      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        setIsLoading(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(t('emergency.locationError'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <button
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseUp={handleStop}
        onTouchEnd={handleStop}
        onMouseLeave={handleStop}
        disabled={isLoading}
        className={`relative w-24 h-24 rounded-full font-bold text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl ${
          isLoading
            ? 'bg-red-400 cursor-not-allowed'
            : isHolding
            ? 'bg-red-600 scale-95'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-red-400 opacity-50 animate-pulse" />

        {progress > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(progress / 100) * 276.46} 276.46`}
            />
          </svg>
        )}

        <div className="relative flex flex-col items-center">
          <AlertCircle size={20} className="mb-1" />
          <span className="text-sm">SOS</span>
        </div>
      </button>

      {showConfirmation && (
        <div className="absolute top-full mt-4 bg-green-50 border-2 border-green-500 rounded-bento p-4 whitespace-nowrap z-50">
          <div className="text-green-700 font-semibold text-sm">
            {t('emergency.helpOnTheWay')}
          </div>

          <div className="text-green-600 text-xs mt-1">
            {t('emergency.eta')}: 7 {t('emergency.minutes')}
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-4 bg-red-50 border-2 border-red-500 rounded-bento p-4 z-50">
          <div className="text-red-700 font-semibold text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
