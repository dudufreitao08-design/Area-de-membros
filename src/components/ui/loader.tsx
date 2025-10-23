export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent ${className}`}
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Loader className="h-12 w-12" />
    </div>
  );
}
