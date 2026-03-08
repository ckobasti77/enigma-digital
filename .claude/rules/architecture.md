# Architecture

## Routing (`app/`)

Next.js App Router. Pages live under `app/(pages)/` using a route group so they share the root layout without adding a URL segment. Each service has its own page under `app/(pages)/services/<service-slug>/page.tsx`.

Service slugs: `web-development`, `ui-ux-design`, `mobile-app-development`, `seo-geo`, `branding`, `social-media`.

## Layout Shell (`app/layout.tsx`)

The root layout wraps everything in:
1. `CookieConsentProvider` - manages cookie consent state
2. `ThemeProvider` - custom light/dark theme system (not next-themes)
3. `div.app-shell` - contains `WaveBackgroundGlobal` (fixed z-0) and content layer (z-10)

The content layer (`z-10`) holds Navbar, page content, Footer, and ScrollToTopButton.

## Background System (`app/_components/WaveBackgroundGlobal.tsx`)

Fixed full-screen interactive SVG wave animation (`components/ui/wave-background.tsx`). Listens to `window` mousemove events so it tracks the cursor regardless of `pointer-events` settings. An overlay div on top mutes the visual intensity.

## Shared Components

- `app/_components/` - App-level components (Hero, Timeline, Footer, Navbar, PageHero, ServiceCards, etc.)
- `components/ui/` - Reusable UI primitives (button, cta-button, auto-typing-console, wave-background)
- `components/EnigmaLogo.tsx` - SVG logo component

## Constants (`constants/`)

Static data separated from components: nav links, service details, timeline steps, challenges, legal content (terms, privacy, brand guidelines), and 3D floating object configs.

## Server Actions (`app/(pages)/contact/actions.ts`)

Contact form uses a Next.js server action with nodemailer. Requires env vars: `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_USER`, `CONTACT_SMTP_PASS`, `CONTACT_EMAIL_FROM`. Optional: `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM_NAME`.

## Fonts

Four local fonts loaded in root layout via `next/font/local`:
- `--font-deltha` (display)
- `--font-terminal` (terminal-grotesque)
- `--font-aeonik` (body, default via `font-aeonik`)
- `--font-broken-console` (monospace accent)
