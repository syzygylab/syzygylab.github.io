# ABC Tutoring website prototype

## Publishing

Pushes to `main` run `.github/workflows/pages.yml` and publish the static `dist/client` output at https://syzygylab.github.io/. Repository Actions variables `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` supply the public browser analytics configuration. Local `.env.local` remains ignored. GitHub Pages must use GitHub Actions as its publishing source.

Phases 2–5: tutor filtering and details, browser-local booking requests, PostHog event capture, and demo traffic are implemented. Visit `/tutors`, `/booking`, `/contact`, and `/demo`. See `docs/prototype-notes.md` for the quick demonstration and `docs/analytics.md` for dashboard setup. Dashboard creation still requires authenticated PostHog access.

A mobile-first proof of concept for helping parents browse tutors and request a tutoring session. The site is designed as a static export for GitHub Pages.

## Local preview

Requirements: Node.js 22.13 or newer and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:3000`.

## Phase 1 checks

- Visit Home, Browse tutors, Booking, and Contact from the main navigation.
- Narrow the browser to approximately 390px to inspect the mobile layout.
- Confirm the header remains usable and the navigation scrolls horizontally when needed.
- Use the Tab key to check the skip link, navigation, and homepage actions.
- Confirm the Contact page labels its email and phone number as placeholders.

## Project checks

```powershell
npm run typecheck
npm run lint
npm run build
```

The production build is written to `dist/client` for later GitHub Pages deployment.
