import { useId } from 'react';

const STATUS_BORDER = {
  default:
    'border-[var(--mv-border)] focus:border-[var(--mv-accent)] focus:ring-2 focus:ring-[var(--mv-accent-ring)]',
  error:
    'border-[var(--mv-error)] focus:border-[var(--mv-error)] focus:ring-2 focus:ring-[var(--mv-error-soft)]',
  success:
    'border-[var(--mv-success)] focus:border-[var(--mv-success)] focus:ring-2 focus:ring-[var(--mv-success-soft)]',
};

export function Input({
  label,
  helperText,
  error,
  success,
  leftIcon: LeftIcon,
  rightElement,
  id,
  className = '',
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const status = error ? 'error' : success ? 'success' : 'default';
  const message = error || success || helperText;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--mv-text-primary)]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon
            className="pointer-events-none absolute left-3.5 h-4 w-4 text-[var(--mv-text-muted)]"
            aria-hidden="true"
          />
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'h-11 w-full rounded-xl border bg-[var(--mv-surface)] text-sm text-[var(--mv-text-primary)]',
            'placeholder:text-[var(--mv-text-muted)] transition-colors duration-150 outline-none',
            'disabled:cursor-not-allowed disabled:bg-[var(--mv-surface-subtle)] disabled:opacity-60',
            LeftIcon ? 'pl-10' : 'pl-3.5',
            rightElement ? 'pr-10' : 'pr-3.5',
            STATUS_BORDER[status],
          ].join(' ')}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">{rightElement}</div>
        )}
      </div>
      {message && (
        <p
          id={messageId}
          className={[
            'text-xs',
            error
              ? 'text-[var(--mv-error)]'
              : success
              ? 'text-[var(--mv-success)]'
              : 'text-[var(--mv-text-secondary)]',
          ].join(' ')}
        >
          {message}
        </p>
      )}
    </div>
  );
}
