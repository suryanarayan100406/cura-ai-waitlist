import { BrandLogo } from "@/components/brand-logo";

export default function Loading() {
  return (
    <div className="bg-grid-soft flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <BrandLogo />
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-brand-deep/15">
          <div className="h-full w-1/3 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full bg-brand-deep" />
        </div>
      </div>
    </div>
  );
}
