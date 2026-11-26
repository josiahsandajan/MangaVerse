import { useId } from 'react';

export function Textarea({
  label,
  helperText,
  error,
  id,
  rows = 4,
  className = '',
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const messageId = `${textareaId}-message`;
  const message = error || helperText;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--mv-text-primary)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={message ? messageId : undefined}
        className={[
          'w-full rounded-xl border bg-[var(--mv-surface)] p-3.5 text-sm text-[var(--mv-text-primary)]',
          'placeholder:text-[var(--mv-text-muted)] transition-colors duration-150 outline-none resize-y',
          'disabled:cursor-not-allowed disabled:bg-[var(--mv-surface-subtle)] disabled:opacity-60',
          error
            ? 'border-[var(--mv-error)] focus:border-[var(--mv-error)] focus:ring-2 focus:ring-[var(--mv-error-soft)]'
            : 'border-[var(--mv-border)] focus:border-[var(--mv-accent)] focus:ring-2 focus:ring-[var(--mv-accent-ring)]',
        ].join(' ')}
        {...props}
      />
      {message && (
        <p
          id={messageId}
          className={`text-xs ${
            error ? 'text-[var(--mv-error)]' : 'text-[var(--mv-text-secondary)]'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
