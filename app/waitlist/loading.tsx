export default function WaitlistLoading() {
  return (
    <div className="bg-grid-soft px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-40 rounded bg-coral/30" />
          <div className="h-10 w-full max-w-xl rounded bg-brand-deep/20" />
          <div className="h-20 w-full max-w-2xl rounded bg-brand-deep/15" />
        </div>
        <div className="h-[420px] animate-pulse rounded-3xl border border-brand-deep/10 bg-white/85" />
      </div>
    </div>
  );
}
