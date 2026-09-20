# Reusable Background Gradient Theme Tokens

## Goal
Create one central set of semantic background-gradient controls so the site’s blue, green, gold, and neutral washes can be fine-tuned consistently without editing individual pages.

## Changes
- Add reusable gradient variables in the global theme for both light and dark modes:
  - `--gradient-hero`
  - `--gradient-page-header`
  - `--gradient-trust-strip`
  - `--gradient-surface-soft`
  - `--gradient-surface-card`
  - `--gradient-surface-accent`
  - `--gradient-section-veil`
  - `--gradient-cta`
  - `--gradient-cta-highlight`
- Add matching utility classes such as `bg-hero`, `bg-page-header`, `bg-trust-strip`, and `bg-cta`.
- Expose the same tokens through the Tailwind theme so future sections can use the standard background names.
- Replace page-specific gradient combinations across Home, About, Team, Services, service details, Contact, sign-in, and admin pages with the shared utilities.
- Replace team and service-card accent gradients with semantic variants, while preserving their current blue, green, and gold distinctions.
- Keep foreground colors, accessibility contrast, existing layout, content, and interactions unchanged.

## Technical Details
- Store all gradient color values in `src/index.css`; page files will reference names only, with no raw gradient color formulas.
- Use HSL-based design variables so each gradient remains compatible with the existing theme palette.
- Add `backgroundImage` mappings in `tailwind.config.ts` for editor autocomplete and consistent Tailwind usage.
- Remove the remote font `@import` from CSS and load no new assets; typography remains otherwise unchanged.
- Validate the changed pages at desktop and mobile widths and confirm there are no remaining ad-hoc section gradient chains.
