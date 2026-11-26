export function HalftoneOverlay({
  dense = false,
  className = '',
  children,
}) {
  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          dense ? 'mv-texture-halftone-dense' : 'mv-texture-halftone'
        }`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
