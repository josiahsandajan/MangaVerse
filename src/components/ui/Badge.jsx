const BADGE_VARIANTS = {
  neutral:
    'bg-[var(--mv-surface-subtle)] text-[var(--mv-text-secondary)] border-[var(--mv-border)]',
  accent:
    'bg-[var(--mv-accent-soft)] text-[var(--mv-accent-text)] border-transparent',
  success:
    'bg-[var(--mv-success-soft)] text-[var(--mv-success)] border-transparent',
  warning:
    'bg-[var(--mv-warning-soft)] text-[var(--mv-warning)] border-transparent',
  error:
    'bg-[var(--mv-error-soft)] text-[var(--mv-error)] border-transparent',
  info:
    'bg-[var(--mv-info-soft)] text-[var(--mv-info)] border-transparent',
};

export function Badge({
  children,
  variant = 'neutral',
  icon: Icon,
  className = '',
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5',
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}
