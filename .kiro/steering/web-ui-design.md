---
inclusion: fileMatch
fileMatchPattern: ["**/*.tsx", "**/*.jsx", "**/*.vue", "**/*.svelte", "**/*.html", "**/*.css", "**/tailwind.config.*"]
---

# Web UI Design Rules — avoid the generic "AI-generated" look

## Before building a new page/component, state in 3 lines

- Direction: ONE aesthetic (editorial, Swiss grid, utilitarian dashboard,
  brutalist, warm organic, luxury minimal) + a real site it resembles.
- Fonts: display + body pair. Never default to Inter/Roboto/Arial/Poppins/system-ui alone.
  e.g. Fraunces + Inter Tight, Space Grotesk + IBM Plex Sans, Instrument Serif + Geist.
- Palette: 1 neutral, 1 sharp accent, 1 support — as tokens.

Why: without a committed direction, output regresses to the SaaS-template average.

## Tokens first

Use only CSS variables / Tailwind theme tokens: --bg --surface --ink --ink-muted
--line --accent --accent-ink, two radii (--radius-sm, --radius-lg), 4/8px spacing,
type scale with big jumps (14/16/20/32/56/88).

Never use raw palette classes (bg-indigo-500, from-purple-500) in components.

## Banned

- Purple/blue gradients, gradient text, glow blobs, glassmorphism
- Centered hero + subtitle + 2 buttons + 3 icon cards
- Emoji icons; an icon on every heading/card
- rounded-2xl + shadow-lg on everything; hover:scale-105 everywhere
- Copy: "seamless", "unlock", "elevate", "supercharge", "all-in-one";
  fake stats, fake testimonials, lorem ipsum, Acme/John Doe

## Do

- Asymmetric CSS Grid (7/5, 8/4), deliberate density OR deliberate whitespace
- Structure with 1px rules and background shifts, not shadow cards
- Headings: tracking-tight, leading 1.05–1.15, text-wrap: balance
- Body: max-w-[65ch], leading 1.6; tabular-nums for data
- One primary button style; secondary = text/outline
- Real domain-specific copy and realistic data
- ONE signature detail (texture, editorial numbering, unusual nav, data visual)
- Motion: one purposeful moment, 150–250ms ease-out, honor prefers-reduced-motion
- Dark mode: tinted near-black (#111318), not #000 + neon
- All states: empty, loading skeleton, error, long text, 0 / 500 items
- WCAG AA contrast, semantic HTML, focus-visible, responsive 360/768/1280/1600

## Before returning

List 3 things that look like a default AI/SaaS template, then fix them.
