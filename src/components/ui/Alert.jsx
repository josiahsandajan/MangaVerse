import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const ALERT_STYLES = {
  info: {
    container: 'bg-[var(--mv-info-soft)] border-[var(--mv-info)]/25 text-[var(--mv-text-primary)]',
    iconColor: 'text-[var(--mv-info)]',
    Icon: Info,
  },
  success: {
    container: 'bg-[var(--mv-success-soft)] border-[var(--mv-success)]/25 text-[var(--mv-text-primary)]',
    iconColor: 'text-[var(--mv-success)]',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'bg-[var(--mv-warning-soft)] border-[var(--mv-warning)]/25 text-[var(--mv-text-primary)]',
    iconColor: 'text-[var(--mv-warning)]',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-[var(--mv-error-soft)] border-[var(--mv-error)]/25 text-[var(--mv-text-primary)]',
    iconColor: 'text-[var(--mv-error)]',
    Icon: AlertCircle,
  },
};

export function Alert({ variant = 'info', title, children, className = '' }) {
  const config = ALERT_STYLES[variant] || ALERT_STYLES.info;
  const Icon = config.Icon;

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-xl border p-4 ${config.container} ${className}`.trim()}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold text-[var(--mv-text-primary)]">{title}</p>}
        {children && (
          <div className="mt-0.5 text-[var(--mv-text-secondary)]">{children}</div>
        )}
      </div>
    </div>
  );
}
