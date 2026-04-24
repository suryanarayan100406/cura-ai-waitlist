export default function FeaturesLoading() {
  return (
    <div className="bg-grid-soft px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl animate-pulse space-y-5">
        <div className="h-4 w-40 rounded bg-brand-deep/20" />
        <div className="h-10 w-full max-w-3xl rounded bg-brand-deep/20" />
        <div className="h-6 w-full max-w-2xl rounded bg-brand-deep/15" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-3xl border border-brand-deep/10 bg-white/80"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
