# Styling Conventions

- Dark-first design: components use dark-mode Tailwind classes (`bg-slate-950`, `text-white`, etc.)
- Light mode is handled via CSS overrides in `globals.css` that remap those classes to theme CSS variables
- Theme-aware utility classes: `.app-shell`, `.theme-card`, `.theme-card-muted`, `.theme-overlay`, `.text-theme-primary`, `.text-theme-muted`, `.border-theme`, `.glow-accent`, `.transition-theme`
- Animations use GSAP ScrollTrigger patterns and CSS keyframes
- The `.card-lift` class provides hover translate/shadow transitions

## Theme System (`app/_components/ThemeProvider.tsx`)

Custom-built, not using next-themes. Supports animated radial-circle transitions between light/dark. Theme is stored in a cookie (`enigma-theme`) only when functional cookies are consented to. Default is dark.

- Uses `html.dark` class + `data-theme` attribute
- CSS overrides in `globals.css` remap dark-mode utility classes (e.g., `bg-black`, `text-white`) to CSS custom properties in light mode using `html[data-theme="light"]` selectors
- Components use `useTheme()` hook from ThemeProvider
