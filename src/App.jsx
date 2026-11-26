import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Container } from './components/ui';

const DesignSystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DesignSystemPage'))
  : null;

function FoundationPlaceholder() {
  return (
    <main className="flex min-h-screen items-center bg-[var(--mv-bg)] py-12 text-[var(--mv-text-primary)]">
      <Container className="max-w-xl">
        <div className="rounded-2xl border border-[var(--mv-border)] bg-[var(--mv-surface)] p-8 shadow-[var(--mv-shadow-sm)]">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--mv-accent-text)]">
            MangaVerse
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            Design System Foundation Ready
          </h1>
          <p className="mt-2 text-sm text-[var(--mv-text-secondary)]">
            The design-system showcase route is available only in development mode
            at <code className="font-mono text-xs">/design-system</code>.
          </p>
        </div>
      </Container>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[var(--mv-bg)] text-sm text-[var(--mv-text-secondary)]">
              Loading...
            </div>
          }
        >
          <Routes>
            {import.meta.env.DEV && DesignSystemPage && (
              <>
                <Route path="/design-system" element={<DesignSystemPage />} />
                <Route
                  path="/"
                  element={<Navigate to="/design-system" replace />}
                />
              </>
            )}
            <Route path="*" element={<FoundationPlaceholder />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
