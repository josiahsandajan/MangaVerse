export function StoryGrid({ children, loading = false, skeletonCount = 12, className = '' }) {
  return (
    <div
      className={[
        'grid gap-3 sm:gap-4',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
