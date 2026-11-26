import { Bell } from 'lucide-react';

export function NotificationBell({ count = 0 }) {
  const hasUnread = count > 0;
  const displayCount = count > 99 ? '99+' : String(count);

  return (
    <button
      type="button"
      aria-label={
        hasUnread
          ? `Notifications — ${displayCount} unread`
          : 'Notifications — no new notifications'
      }
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]"
    >
      <Bell className="h-5 w-5" aria-hidden="true" />
      {hasUnread && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--mv-error)] px-1 text-[10px] font-bold leading-none text-white"
        >
          {displayCount}
        </span>
      )}
    </button>
  );
}
