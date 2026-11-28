import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const THEME_STORAGE_KEY = 'mv-theme';
const PREFERENCES = ['light', 'dark', 'system'];
const DEFAULT_PREFERENCE = 'light';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const ThemeContext = createContext(null);

function isPreference(value) {
  return PREFERENCES.includes(value);
}

function readStoredPreference() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isPreference(stored)) return stored;
  } catch {
    // Storage unavailable (private mode, blocked cookies): use the default.
  }
  return DEFAULT_PREFERENCE;
}

function writeStoredPreference(preference) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage unavailable: the preference still applies for this session.
  }
}

function getSystemTheme() {
  try {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  } catch {
    // matchMedia unavailable: fall back to the default theme.
    return 'light';
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (root.getAttribute('data-theme') !== theme) {
    root.setAttribute('data-theme', theme);
  }
  root.classList.toggle('dark', theme === 'dark');
}

export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // The resolved theme is derived, never stored, so it cannot drift from the preference.
  const theme = preference === 'system' ? systemTheme : preference;
  const themeRef = useRef(theme);

  // Apply before paint so a change never shows one frame of the old theme.
  useLayoutEffect(() => {
    themeRef.current = theme;
    applyTheme(theme);
  }, [theme]);

  // Follow the operating system only while "system" is selected.
  useEffect(() => {
    if (preference !== 'system') return undefined;
    let query;
    try {
      query = window.matchMedia(DARK_QUERY);
    } catch {
      return undefined;
    }
    const handleChange = (event) => setSystemTheme(event.matches ? 'dark' : 'light');
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [preference]);

  const setPreference = useCallback((next) => {
    if (!isPreference(next)) return;
    // Refresh the system value in the same update so switching to "system"
    // never renders a stale theme.
    if (next === 'system') setSystemTheme(getSystemTheme());
    setPreferenceState(next);
    writeStoredPreference(next);
  }, []);

  // Backward compatible: accepts a value or an updater, like the old useState setter.
  const setTheme = useCallback(
    (next) => setPreference(typeof next === 'function' ? next(themeRef.current) : next),
    [setPreference]
  );

  const toggleTheme = useCallback(
    () => setPreference(themeRef.current === 'dark' ? 'light' : 'dark'),
    [setPreference]
  );

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      preference,
      setPreference,
      setTheme,
      toggleTheme,
    }),
    [theme, preference, setPreference, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
