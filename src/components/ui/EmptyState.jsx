import { BookOpen } from 'lucide-react';

export function EmptyState({
  icon: Icon = BookOpen,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={[
        'mv-texture-contour relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--mv-border-strong)] bg-[var(--mv-surface)] px-6 py-12 text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--mv-border)] bg-[var(--mv-surface-subtle)] text-[var(--mv-accent-text)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-[var(--mv-text-primary)]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-[var(--mv-text-secondary)]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
