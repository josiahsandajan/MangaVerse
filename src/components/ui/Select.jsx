import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  helperText,
  error,
  options = [],
  id,
  className = '',
  disabled = false,
  children,
  ...props
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const messageId = `${selectId}-message`;
  const message = error || helperText;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[var(--mv-text-primary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'h-11 w-full appearance-none rounded-xl border bg-[var(--mv-surface)] pl-3.5 pr-10 text-sm text-[var(--mv-text-primary)]',
            'transition-colors duration-150 outline-none cursor-pointer',
            'disabled:cursor-not-allowed disabled:bg-[var(--mv-surface-subtle)] disabled:opacity-60',
            error
              ? 'border-[var(--mv-error)] focus:border-[var(--mv-error)] focus:ring-2 focus:ring-[var(--mv-error-soft)]'
              : 'border-[var(--mv-border)] focus:border-[var(--mv-accent)] focus:ring-2 focus:ring-[var(--mv-accent-ring)]',
          ].join(' ')}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mv-text-muted)]"
          aria-hidden="true"
        />
      </div>
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
