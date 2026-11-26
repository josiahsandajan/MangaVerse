import { useId } from 'react';

export function Switch({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = '',
}) {
  const generatedId = useId();
  const switchId = id || generatedId;

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`.trim()}>
      {(label || description) && (
        <label
          htmlFor={switchId}
          className={disabled ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'}
        >
          {label && (
            <span className="block text-sm font-medium text-[var(--mv-text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-xs text-[var(--mv-text-secondary)]">
              {description}
            </span>
          )}
        </label>
      )}
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-150',
          'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
          checked
            ? 'border-[var(--mv-accent)] bg-[var(--mv-accent)]'
            : 'border-[var(--mv-border-strong)] bg-[var(--mv-surface-subtle)]',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'inline-block h-4 w-4 rounded-full bg-white shadow-xs transition-transform duration-150',
            checked ? 'translate-x-6' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
