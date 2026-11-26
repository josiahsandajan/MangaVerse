export function PaperTexture({ children, className = '', as: Component = 'div' }) {
  return (
    <Component
      className={`mv-texture-paper bg-[var(--mv-surface)] ${className}`.trim()}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
