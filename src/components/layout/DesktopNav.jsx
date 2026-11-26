import { NavLink } from 'react-router-dom';
import { BookOpen, Compass, MessageCircle } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/browse', label: 'Browse', icon: Compass },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/community', label: 'Community', icon: MessageCircle },
];

export function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center lg:gap-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          aria-current={undefined} /* NavLink sets this automatically when active */
          className={({ isActive }) =>
            [
              'inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors duration-150',
              isActive
                ? 'bg-[var(--mv-accent-soft)] text-[var(--mv-accent-text)]'
                : 'text-[var(--mv-text-secondary)] hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]',
            ].join(' ')
          }
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
