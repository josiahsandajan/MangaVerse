import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './components/layout/AppLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DesignSystemPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DesignSystemPage'))
  : null;

function LoadingFallback() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center bg-[var(--mv-bg)] text-sm text-[var(--mv-text-secondary)]"
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Application shell wraps all real app pages */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              {/* Future pages registered here: /browse, /story/:id, /library, /community */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Dev-only showcase — bypasses AppLayout (has its own header) */}
            {import.meta.env.DEV && DesignSystemPage && (
              <Route path="/design-system" element={<DesignSystemPage />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
