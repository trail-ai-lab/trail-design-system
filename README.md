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
pnpm add github:trail-ai-lab/trail-design-system#v2.1.1
```

(or the equivalent `"@trail-ai-lab/trail-design-system": "github:trail-ai-lab/trail-design-system#v2.1.1"`
entry in `package.json`). Installing runs this repo's `prepare` script, which builds `dist/`.

`react`, `react-dom`, and `next` are peer dependencies — the consuming app supplies its own.

## Subpaths

| Import | What it's for |
| --- | --- |
| `@trail-ai-lab/trail-design-system` | Shadcn UI primitives — `Button`, `Card`, `Dialog`, `Sidebar`, etc. Anything in `src/components/ui/`. |
| `@trail-ai-lab/trail-design-system/slai` | Components specific to the SLAI tool (recording flow, transcripts, activity picker, `AppShell`/`SlaiSidebar` page shell). |
| `@trail-ai-lab/trail-design-system/lab-website` | Components for the Trail Lab marketing site (`Header`, `LabFooter`, `Hero`, `PersonCard`, `ResourceCard`, etc.). |
| `@trail-ai-lab/trail-design-system/globals.css` | The design tokens (semantic colors, radius scale, fonts) every other subpath's components are styled against. Import this once in your app's root layout/entry — nothing here will look right without it. |

`aibat`, `bias-audit`, `casting-lab`, `murder-mystery`, and `trail-console` are also
declared as subpaths (`@trail-ai-lab/trail-design-system/aibat`, etc.), but each is
currently an **empty stub** — no components exist yet. They're placeholders for tools
that will get built out over time; importing from them today gets you nothing.

## Usage

```tsx
// once, in your app's root layout
import "@trail-ai-lab/trail-design-system/globals.css"

import { Button } from "@trail-ai-lab/trail-design-system"
import { RecordingControl } from "@trail-ai-lab/trail-design-system/slai"
import { Hero } from "@trail-ai-lab/trail-design-system/lab-website"
```

## Development

```
pnpm install
pnpm storybook   # browse every component + its states
pnpm build       # tsup -> dist/ (cjs + esm + d.ts per subpath)
pnpm lint        # tsc --noEmit
```

New Shadcn primitives go in `src/components/ui/` (installed via the Shadcn CLI only —
see [`components.json`](components.json) — never hand-written). Shared Trail components
go in `src/components/trail/`; tool-specific components go in `src/components/{tool}/`.
Every component needs a matching Storybook story in `stories/{namespace}/`. See
[`CLAUDE.md`](CLAUDE.md) for the full component and token rules.

`src/components/blocks/` is unmodified shadcn-studio template content kept as design
reference only — see [its README](src/components/blocks/README.md) — it is not part of
the published package.

## Versioning & releases

Releases are git tags (`vX.Y.Z`). To cut one, bump `version` in `package.json`, add an entry
to [`CHANGELOG.md`](CHANGELOG.md) describing what changed (move anything under "Unreleased"),
merge to `main`, then tag the merge commit:

```
git tag vX.Y.Z && git push origin vX.Y.Z
```

Consumers pick up the change by updating the tag in their own `package.json`.
