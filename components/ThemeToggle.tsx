'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

/**
 * Light/dark toggle. Default state is the OS preference (Renge's tokens already
 * follow `prefers-color-scheme`); clicking sets an explicit `data-mode` on
 * <html>, persisted to localStorage and re-applied before paint by the head
 * script in layout.tsx. Accessible: a labeled button whose label reflects the
 * action, `aria-pressed` reflecting the current state.
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-mode');
    if (attr === 'dark' || attr === 'light') {
      setMode(attr);
    } else {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  function toggle() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-mode', next);
    try {
      localStorage.setItem('aria-theme', next);
    } catch {
      /* private mode / storage disabled — the choice just won't persist */
    }
    setMode(next);
  }

  const isDark = mode === 'dark';
  // Before mount `mode` is null; render a stable placeholder so server and
  // first client render agree, then swap the icon in once we know the mode.
  const label = mode === null ? 'Toggle theme' : isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={mode === null ? undefined : isDark}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-renge-1 border border-renge-border text-renge-fg transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          // Sun — clicking returns to light
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          // Moon — clicking goes to dark (also the null/placeholder state)
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
