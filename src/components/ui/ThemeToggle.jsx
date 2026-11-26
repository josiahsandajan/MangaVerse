import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';

export function ThemeToggle({ showLabel = false, className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      iconOnly={!showLabel}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      leftIcon={isDark ? Sun : Moon}
      className={className}
    >
      {showLabel ? (isDark ? 'Light mode' : 'Dark mode') : null}
    </Button>
  );
}
