import { Menu, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { DesktopNav } from './DesktopNav';
import { HeaderSearch } from './HeaderSearch';
import { NotificationBell } from './NotificationBell';
import { UserMenu } from './UserMenu';

export function AppHeader({ isMobileNavOpen, onToggleMobileNav }) {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 border-b border-[var(--mv-border)] bg-[var(--mv-surface)]/90 backdrop-blur-md"
    >
      {/* Skip to main content — only visible on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--mv-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:no-underline"
      >
        Skip to main content
      </a>

      <Container className="flex h-16 items-center gap-1.5 sm:gap-3">
        {/* Logo */}
        <Link
          to="/"
          aria-label="MangaVerse — go to homepage"
          className="flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--mv-accent-ring)] sm:mr-2 sm:gap-2.5"
        >
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mv-accent)] text-white"
          >
            <BookMarked className="h-4 w-4" />
          </div>
          <span className="font-[family-name:var(--font-heading)] text-base font-bold tracking-tight text-[var(--mv-text-primary)]">
            MangaVerse
          </span>
        </Link>

        {/* Desktop nav (lg+) */}
        <DesktopNav />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Header actions */}
        <div className="flex items-center gap-1">
          <HeaderSearch />
          <NotificationBell count={0} />
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <UserMenu />

          {/* Hamburger (< lg) */}
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label={isMobileNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)] lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </header>
  );
}
