import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { MobileNav } from './MobileNav';

export function AppLayout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--mv-bg)]">
      <AppHeader onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {/* Main content area — aria-hidden when drawer is open to prevent background interaction */}
      <main
        id="main-content"
        tabIndex={-1}
        aria-hidden={isMobileNavOpen || undefined}
        className="flex-1 outline-none"
      >
        <Outlet />
      </main>
    </div>
  );
}
