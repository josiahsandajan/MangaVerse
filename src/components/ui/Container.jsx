export function Container({ children, className = '', as: Component = 'div' }) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
