import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { ContourLines } from '../components/textures/ContourLines';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <ContourLines className="flex min-h-[60vh] items-center py-16">
      <Container className="max-w-lg text-center">
        <p className="select-none font-[family-name:var(--font-mono)] text-6xl font-bold text-[var(--mv-accent-soft)]" aria-hidden="true">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--mv-text-primary)]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--mv-text-secondary)]">
          This page doesn't exist yet — or has been moved. Head back to discover
          your next story.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-transparent bg-[var(--mv-accent)] px-4 text-sm font-medium text-[var(--mv-on-accent)] shadow-[var(--mv-shadow-xs)] transition-colors duration-150 hover:bg-[var(--mv-accent-hover)]"
          >
            <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-transparent px-4 text-sm font-medium text-[var(--mv-text-secondary)] transition-colors duration-150 hover:bg-[var(--mv-surface-subtle)] hover:text-[var(--mv-text-primary)]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            Go back
          </button>
        </div>
      </Container>
    </ContourLines>
  );
}
