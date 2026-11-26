import { useId } from 'react';
import { Check } from 'lucide-react';

export function Checkbox({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={[
        'inline-flex items-start gap-3 select-none',
        disabled ? 'cursor-not-allowed opacity-55' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={[
            'flex h-5 w-5 items-center justify-center rounded-md border transition-colors duration-150',
            'border-[var(--mv-border-strong)] bg-[var(--mv-surface)]',
            'peer-checked:border-[var(--mv-accent)] peer-checked:bg-[var(--mv-accent)]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--mv-accent-ring)]',
          ].join(' ')}
        >
          {checked && (
            <Check className="h-3.5 w-3.5 text-[var(--mv-on-accent)]" strokeWidth={2.5} />
          )}
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-[var(--mv-text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--mv-text-secondary)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
