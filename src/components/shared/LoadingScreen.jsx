import { Logo } from './Logo';
export function LoadingScreen() {
  return <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center"><div className="text-center"><div className="mb-8 flex justify-center"><div className="animate-pulse"><Logo size={60} /></div></div><p className="text-neutral-600 font-medium">Loading...</p></div></div>;
}
