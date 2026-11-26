export function AsciiPixelAccent({
  glyph = '//',
  children,
  className = '',
}) {
  return (
    <span
      className={[
        'mv-texture-ascii mv-pixel-notch inline-flex items-center gap-2 rounded-md bg-[var(--mv-surface)] px-2.5 py-1 text-xs font-medium text-[var(--mv-accent-text)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden="true" className="opacity-70">
        {glyph}
      </span>
      <span>{children}</span>
    </span>
  );
}
