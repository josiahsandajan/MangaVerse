import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus the input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/browse?q=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
    setQuery('');
  }

  function handleClose() {
    setIsOpen(false);
    setQuery('');
  }

  if (isOpen) {
    return (
      <form
        role="search"
        aria-label="Search catalog"
        onSubmit={handleSubmit}
        className="flex items-center gap-1"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mv-text-muted)]"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, genres…"
            aria-label="Search catalog"
            className="h-10 w-32 rounded-xl border border-[var(--mv-border)] bg-[var(--mv-surface-subtle)] pl-9 pr-3 text-sm text-[var(--mv-text-primary)] placeholder:text-[var(--mv-text-muted)] outline-none transition-all duration-150 focus:w-40 sm:w-48 sm:focus:w-64 focus:border-[var(--mv-accent)] focus:ring-2 focus:ring-[var(--mv-accent-ring)] lg:w-56 lg:focus:w-72"
          />
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close search"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label="Open search"
      aria-expanded={isOpen}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]"
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
