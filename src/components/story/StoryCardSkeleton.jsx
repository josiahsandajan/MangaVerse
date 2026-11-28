export function StoryCardSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {/* Cover skeleton */}
      <div
        className="rounded-xl bg-[var(--mv-surface-subtle)]"
        style={{ aspectRatio: '2/3' }}
      />
      {/* Meta skeleton */}
      <div className="px-0.5 pt-2.5 pb-1 space-y-2">
        <div className="h-3.5 w-4/5 rounded-full bg-[var(--mv-surface-subtle)]" />
        <div className="h-3 w-2/3 rounded-full bg-[var(--mv-surface-subtle)]" />
        <div className="h-3 w-1/2 rounded-full bg-[var(--mv-surface-subtle)]" />
      </div>
    </div>
  );
}
