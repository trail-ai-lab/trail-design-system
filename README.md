# @trail-ai-lab/trail-design-system

Trail Lab's shared design system — Shadcn-based UI primitives plus components for the Trail
Lab website and internal research tools (SLAI, and future tools). Other Trail Lab repos
install it from a git release tag so they share the same components, tokens, and visual
language.

## Consuming this package

The package is **`@trail-ai-lab/trail-design-system`**. It is not published to a registry:
consumers install it from a git release tag and bump the tag themselves when they want a
newer version. No registry config or auth token is needed.

```
pnpm add github:trail-ai-lab/trail-design-system#v1.3.0
```

(or the equivalent `"@trail-ai-lab/trail-design-system": "github:trail-ai-lab/trail-design-system#v1.3.0"`
entry in `package.json`). Installing runs this repo's `prepare` script, which builds `dist/`.

### Requirements

- **React 19** and **next-themes** (peer dependencies — the app installs them, so the theme context is shared)
- **Tailwind CSS v4** in the app (the stylesheet is Tailwind source, compiled by your build)
- **Node 20.9+**. Built and tested against Next.js 16; works in any React 19 + Tailwind v4 app.

### Setup

1. Import the stylesheet once, from your app's main CSS file (the one Tailwind processes):

   ```css
   @import "@trail-ai-lab/trail-design-system/styles.css";
   ```

   This brings in the theme tokens, layout tokens, default fonts, and tells Tailwind to scan
   the package's components — no `@source` setup needed in your app.

2. Load the fonts. The tokens default to **Inter** (body), **Montserrat** (headings) and
   **Geist Mono** (code) but don't bundle the font files. With Next.js:

   ```tsx
   import { Inter, Montserrat, Geist_Mono } from "next/font/google"

   const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
   const heading = Montserrat({
     subsets: ["latin"],
     variable: "--font-heading",
   })
   const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

   // <html className={`${sans.variable} ${heading.variable} ${mono.variable}`}>
   ```

3. Wrap the app root in `next-themes`' `ThemeProvider` (`attribute="class"`, for dark mode and
   `ModeToggle`) and in `TooltipProvider` from this package (shadcn's Tooltip requires it).

## Subpaths

| Import                                          | What it's for                                                                                                                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@trail-ai-lab/trail-design-system`             | Everything shared: the shadcn primitives in `src/components/ui/` (`Button`, `Card`, `Dialog`, `Sidebar`, …) plus all patterns.                                                               |
| `@trail-ai-lab/trail-design-system/ui`          | The primitives without Chart, Calendar and Combobox, for apps that don't need those heavier dependencies.                                                                                    |
| `@trail-ai-lab/trail-design-system/patterns`    | Shared patterns used across tools: `SectionLabel`, `PageBreadcrumb`, `PersonRow`, `IconTile`, `CardLink`, `ConfirmDialog`, `ModeToggle`, auth screens. Also re-exported from the main entry. |
| `@trail-ai-lab/trail-design-system/slai`        | Components specific to the SLAI tool (recording flow, transcripts, activity picker, `AppShell`/`SlaiSidebar` page shell).                                                                    |
| `@trail-ai-lab/trail-design-system/lab-website` | Components for the Trail Lab marketing site (`Header`, `LabFooter`, `Hero`, `PersonCard`, `ResourceCard`, etc.).                                                                             |
| `@trail-ai-lab/trail-design-system/styles.css`  | **The stylesheet to import** — combines the files below and registers the package with Tailwind.                                                                                             |
| `…/globals.css`                                 | Theme tokens (colors, radius) generated from the design preset, plus Tailwind.                                                                                                               |
| `…/semantic.css`                                | Trail's color layer: meaning colors, status aliases, contrast fixes, focus ring.                                                                                                             |
| `…/scales.css`                                  | Type scale, elevation, motion and z-index utilities; reduced-motion handling.                                                                                                                |
| `…/layout.css`                                  | Page-chrome spacing tokens (`--shell-*`) used by `AppShell`.                                                                                                                                 |
| `…/fonts.css`                                   | Default font families for `--font-sans`, `--font-heading`, `--font-mono`.                                                                                                                    |

`src/components/` also holds placeholder folders for future tools (`aibat`,
`bias-audit`, `casting-lab`, `murder-mystery`, `trail-console`). They have no
components and no subpath yet; when a tool gets its first component, add its entry
to `tsup.config.ts` and `package.json` `exports`.

## Usage

```tsx
import { Button } from "@trail-ai-lab/trail-design-system"
import { RecordingControl } from "@trail-ai-lab/trail-design-system/slai"
import { Hero } from "@trail-ai-lab/trail-design-system/lab-website"
```

## Development

```
pnpm install
pnpm storybook       # browse every component + its states
pnpm check           # everything CI runs: format, lint, tests, build
pnpm lint            # TypeScript (src, stories, .storybook) + ESLint incl. token rules
pnpm test            # unit tests + every story in Chromium with accessibility checks
pnpm format          # Prettier (with Tailwind class sorting)
pnpm build           # tsup -> dist/ (cjs + esm + d.ts per subpath)
```

New Shadcn primitives go in `src/components/ui/` (installed via the Shadcn CLI only —
see [`components.json`](components.json) — never hand-written). Update all of them to the
latest registry with `pnpm ui:update`, then review the diff. The theme comes from shadcn preset
`b4iVaPtZI` (red theme, mist base) — regenerate `globals.css` from it, never edit it by hand. Shared patterns
go in `src/components/patterns/`; tool-specific components go in `src/components/{tool}/`.
Every component needs a matching Storybook story in `stories/{namespace}/`. See
[`CLAUDE.md`](CLAUDE.md) for the full component and token rules.

`src/components/blocks/` is unmodified shadcn-studio template content kept as design
reference only — see [its README](src/components/blocks/README.md) — it is not part of
the published package.

## Versioning & releases

Releases follow [Semantic Versioning](https://semver.org) and are git tags (`vX.Y.Z`) that
equal `version` in `package.json`; `1.0.0` is the first stable release. In short:

- **MAJOR** — breaking: something removed or renamed, a prop changed or made required, a
  default or token meaning changed, a peer dependency minimum raised. Comes with _Migrate:_ notes.
- **MINOR** — additions that need no code changes: new components, optional props, variants,
  tokens; intentional visual updates; deprecations.
- **PATCH** — fixes: bugs, accessibility, visual glitches, internal refactors.

[`VERSIONING.md`](VERSIONING.md) has the full rules, the deprecation policy, pre-release tags
and the release steps. Every change is recorded in [`CHANGELOG.md`](CHANGELOG.md) under
"Unreleased" until it ships. Consumers pick up a release by updating the tag in their own
`package.json`.
