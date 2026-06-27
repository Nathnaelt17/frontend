export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-teal-600"></div>
      <p className="mt-4 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}
