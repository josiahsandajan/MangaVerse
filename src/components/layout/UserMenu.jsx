import { Link } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';

/**
 * Renders a "Sign in" trigger for now.
 * When authentication is implemented this will switch to an avatar/dropdown.
 */
export function UserMenu() {
  return (
    <Link
      to="/login"
      aria-label="Sign in"
      className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-xl border border-[var(--mv-border-strong)] bg-transparent text-sm font-medium text-[var(--mv-text-primary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] sm:w-auto sm:px-3.5"
    >
      <User className="h-4 w-4 shrink-0 text-[var(--mv-text-secondary)]" aria-hidden="true" />
      <span className="hidden sm:inline">Sign in</span>
    </Link>
  );
}
