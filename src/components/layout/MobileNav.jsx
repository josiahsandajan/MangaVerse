import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookMarked,
  BookOpen,
  Compass,
  MessageCircle,
  X,
} from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_ITEMS = [
  { to: '/browse', label: 'Browse', icon: Compass },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/community', label: 'Community', icon: MessageCircle },
];

export function MobileNav({ isOpen, onClose }) {
  const drawerRef = useFocusTrap(isOpen);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={[
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[var(--mv-surface)] shadow-[var(--mv-shadow-md)] transition-transform duration-200 lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--mv-border)] px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mv-accent)] text-white">
              <BookMarked className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-[family-name:var(--font-heading)] text-base font-bold tracking-tight">
              MangaVerse
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1" role="list">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-[var(--mv-accent-soft)] text-[var(--mv-accent-text)]'
                        : 'text-[var(--mv-text-secondary)] hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]',
                    ].join(' ')
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="shrink-0 border-t border-[var(--mv-border)] px-4 py-4 space-y-3">
          <ThemeToggle showLabel className="w-full justify-between" />
          <a
            href="/login"
            className="flex h-10 w-full items-center justify-center rounded-xl border border-[var(--mv-border-strong)] text-sm font-medium text-[var(--mv-text-primary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)]"
          >
            Sign in
          </a>
        </div>
      </div>
    </>
  );
}
