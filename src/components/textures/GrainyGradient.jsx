export function GrainyGradient({ children, className = '', as: Component = 'section' }) {
  return (
    <Component className={`mv-texture-grainy ${className}`.trim()}>
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
