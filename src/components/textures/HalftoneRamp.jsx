export function HalftoneRamp({ direction = 'right', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`mv-texture-halftone mv-texture-halftone-ramp ${className}`.trim()}
      data-direction={direction}
    />
  );
}
