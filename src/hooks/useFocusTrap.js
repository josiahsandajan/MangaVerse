import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps keyboard focus within the returned containerRef when isActive is true.
 * Automatically restores focus to the previously focused element when deactivated.
 */
export function useFocusTrap(isActive) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    // Store the element that had focus before the trap activated
    previousFocusRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    // Move focus to the first focusable element in the container
    const focusable = container.querySelectorAll(FOCUSABLE_SELECTORS);
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;

      const all = Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS));
      if (all.length === 0) {
        e.preventDefault();
        return;
      }

      const first = all[0];
      const last = all[all.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
