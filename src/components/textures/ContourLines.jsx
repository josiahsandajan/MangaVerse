export function ContourLines({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={`mv-texture-contour relative ${className}`.trim()}>
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
