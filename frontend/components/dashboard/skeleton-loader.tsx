"use client";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 glow-border">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
            <div className="w-12 h-5 rounded-full skeleton-shimmer" />
          </div>
          <div className="w-16 h-7 skeleton-shimmer rounded mb-2" />
          <div className="w-24 h-4 skeleton-shimmer rounded" />
        </div>
      ))}
    </div>
  );
}

export function ReferralCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 glow-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
            <div>
              <div className="w-32 h-4 skeleton-shimmer rounded mb-1.5" />
              <div className="w-20 h-3 skeleton-shimmer rounded" />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-3 skeleton-shimmer rounded" />
            <div className="w-16 h-3 skeleton-shimmer rounded" />
          </div>
          <div className="w-16 h-5 skeleton-shimmer rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="glass rounded-2xl p-5 glow-border">
      <div className="w-32 h-5 skeleton-shimmer rounded mb-4" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3">
            <div className="w-8 h-8 rounded-lg skeleton-shimmer shrink-0" />
            <div className="flex-1">
              <div className="w-full h-4 skeleton-shimmer rounded mb-1.5" />
              <div className="w-16 h-3 skeleton-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
