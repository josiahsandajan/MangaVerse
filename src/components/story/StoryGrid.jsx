import { StoryCardSkeleton } from './StoryCardSkeleton';

export function StoryGrid({ children, loading = false, skeletonCount = 12, className = '' }) {
  const parsedSkeletonCount = Number(skeletonCount);
  const visibleSkeletonCount = Number.isFinite(parsedSkeletonCount)
    ? Math.max(0, Math.floor(parsedSkeletonCount))
    : 0;

  return (
    <div
      aria-busy={loading || undefined}
      className={[
        'grid gap-3 sm:gap-4',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <>
          <span role="status" className="sr-only">
            Loading stories
          </span>
          {Array.from({ length: visibleSkeletonCount }, (_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        </>
      ) : (
        children
      )}
    </div>
  );
}
