import defaultBackdrop from '../../assets/dithered/ambient-backdrop.png';

export function BlurredBackdrop({
  src = defaultBackdrop,
  children,
  className = '',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="mv-texture-blurred-img pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--mv-blur-scrim)] backdrop-blur-xs"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
