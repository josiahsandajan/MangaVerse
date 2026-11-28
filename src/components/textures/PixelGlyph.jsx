const GLYPH_PATHS = {
  spark: 'M4 0h1v2h1v1h1v1h2v1H7v1H6v1H5v2H4V7H3V6H2V5H0V4h2V3h1V2h1z',
  corner: 'M0 0h9v1H1v8H0z M3 3h4v1H4v3H3z',
  diamond: 'M4 0h1v1h1v1h1v1h1v1h1v1H8v1H7v1H6v1H5v1H4V8H3V7H2V6H1V5H0V4h1V3h1V2h1V1h1z',
};

export function PixelGlyph({ variant = 'spark', className = '' }) {
  const path = Object.hasOwn(GLYPH_PATHS, variant) ? GLYPH_PATHS[variant] : GLYPH_PATHS.spark;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`mv-pixel-glyph ${className}`.trim()}
      viewBox="0 0 9 9"
      width="18"
      height="18"
      fill="currentColor"
      shapeRendering="crispEdges"
    >
      <path d={path} />
    </svg>
  );
}
