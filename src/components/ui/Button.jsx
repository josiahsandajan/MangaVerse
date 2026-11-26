import { Loader2 } from 'lucide-react';

const VARIANT_CLASSES = {
  primary:
    'bg-[var(--mv-accent)] text-[var(--mv-on-accent)] hover:bg-[var(--mv-accent-hover)] active:bg-[var(--mv-accent-active)] border border-transparent shadow-[var(--mv-shadow-xs)]',
  secondary:
    'bg-[var(--mv-surface-subtle)] text-[var(--mv-text-primary)] hover:bg-[var(--mv-border)] border border-[var(--mv-border)]',
  outline:
    'bg-transparent text-[var(--mv-text-primary)] hover:bg-[var(--mv-surface-subtle)] border border-[var(--mv-border-strong)]',
  ghost:
    'bg-transparent text-[var(--mv-text-secondary)] hover:text-[var(--mv-text-primary)] hover:bg-[var(--mv-surface-subtle)] border border-transparent',
  danger:
    'bg-[var(--mv-error)] text-white hover:opacity-90 border border-transparent shadow-[var(--mv-shadow-xs)]',
};

const SIZE_CLASSES = {
  sm: 'h-9 px-3 text-xs gap-1.5 rounded-[10px]',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-11 px-5 text-sm gap-2 rounded-xl',
};

const ICON_SIZE_CLASSES = {
  sm: 'h-9 w-9 p-0 rounded-[10px]',
  md: 'h-10 w-10 p-0 rounded-xl',
  lg: 'h-11 w-11 p-0 rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  iconOnly = false,
  as: Component = 'button',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading;
  // Only set type/disabled on actual <button> elements
  const isNativeButton = Component === 'button';

  return (
    <Component
      type={isNativeButton ? type : undefined}
      disabled={isNativeButton ? isDisabled : undefined}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center justify-center font-medium transition-colors duration-150 select-none',
        'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
        iconOnly
          ? ICON_SIZE_CLASSES[size] || ICON_SIZE_CLASSES.md
          : SIZE_CLASSES[size] || SIZE_CLASSES.md,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        LeftIcon && <LeftIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      {!iconOnly && children}
      {!loading && RightIcon && (
        <RightIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
    </Component>
  );
}
