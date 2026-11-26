const CARD_VARIANTS = {
  surface:
    'bg-[var(--mv-surface)] border border-[var(--mv-border)] shadow-[var(--mv-shadow-xs)]',
  subtle:
    'bg-[var(--mv-surface-subtle)] border border-[var(--mv-border)]',
  elevated:
    'bg-[var(--mv-surface-elevated)] border border-[var(--mv-border)] shadow-[var(--mv-shadow-md)]',
};

export function Card({
  children,
  variant = 'surface',
  interactive = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={[
        'rounded-2xl transition-colors duration-150',
        CARD_VARIANTS[variant] || CARD_VARIANTS.surface,
        interactive &&
          'hover:border-[var(--mv-border-strong)] hover:shadow-[var(--mv-shadow-sm)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-5 pt-5 pb-3 ${className}`.trim()}>{children}</div>;
}

export function CardTitle({ children, className = '', as: Component = 'h3' }) {
  return (
    <Component
      className={`text-base font-semibold text-[var(--mv-text-primary)] ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`mt-1 text-sm text-[var(--mv-text-secondary)] ${className}`.trim()}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-5 pb-5 ${className}`.trim()}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-t border-[var(--mv-border)] px-5 py-3.5 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
