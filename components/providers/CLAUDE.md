# components/providers/ — Context providers

Client-side React context providers mounted in `app/layout.tsx`.

## Files

- `theme-provider.tsx` — wraps `next-themes` `ThemeProvider`. Config: `attribute="class"`,
  `defaultTheme="dark"`, `enableSystem`. This is what makes `dark:` / theme tokens and
  the `theme-toggle` work. Also mounts framer-motion's `MotionConfig`
  (`reducedMotion="user"`) so OS-level "reduce motion" is honored site-wide.

## Conventions

- Providers are thin wrappers around a library provider; keep configuration here so
  the rest of the app just consumes hooks (`useTheme`, etc.).
- Mount new providers in `app/layout.tsx`, wrapping `{children}`.
- Keep provider config in sync with the CSS: `next-themes` uses the `class` strategy,
  and `app/globals.css` defines light (`:root`) and dark (`.dark`) token sets.

## Do / Don't

- ✅ Add cross-cutting client context here and mount it in the root layout.
- ❌ Don't change the theme `attribute`/strategy without updating `globals.css` tokens.
