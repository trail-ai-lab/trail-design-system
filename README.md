# @trail-ai-lab/trail-design-system

Trail Lab's shared design system — Shadcn-based UI primitives plus components for the Trail
Lab website and internal research tools (SLAI, and future tools). Published to GitHub
Packages so other Trail Lab repos can install and share the same components, tokens, and
visual language.

## Consuming this package

This package is published as **`@trail-ai-lab/trail-design-system`** on **GitHub
Packages**, not the public npm registry. GitHub Packages is private by default: pulling
the package into a consumer repo requires an authenticated `read:packages` token, the
same as publishing does — an anonymous `pnpm install` will fail with a bare "package not
found" even though the package exists.

Add to your consuming repo's `.npmrc` (see [`.npmrc`](.npmrc) in this repo for the
matching pattern used here):

```
@trail-ai-lab:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

`NODE_AUTH_TOKEN` needs `read:packages` access to this repo (a GitHub PAT, or
`GITHUB_TOKEN` in Actions — Actions' default token only has read access to packages in
the same repo, so cross-repo consumers need a PAT). Then install:

```
pnpm add @trail-ai-lab/trail-design-system
```

`react`, `react-dom`, and `next` are peer dependencies — the consuming app supplies its own.

## Subpaths

| Import | What it's for |
| --- | --- |
| `@trail-ai-lab/trail-design-system` | Shadcn UI primitives — `Button`, `Card`, `Dialog`, `Sidebar`, etc. Anything in `src/components/ui/`. |
| `@trail-ai-lab/trail-design-system/slai` | Components specific to the SLAI tool (recording flow, transcripts, activity picker, `AppShell`/`SlaiSidebar` page shell). |
| `@trail-ai-lab/trail-design-system/lab-website` | Components for the Trail Lab marketing site (`Header`, `Footer`, `Hero`, `PersonCard`, `ResourceCard`, etc.). |
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

This repo uses [changesets](https://github.com/changesets/changesets). Any PR that
changes published behavior should include a changeset:

```
pnpm changeset
```

On merge to `main`, CI either opens/updates a "Version Packages" PR (if changesets are
pending) or publishes to GitHub Packages (once that PR is merged and the version bump is
on `main`). See [`CHANGELOG.md`](CHANGELOG.md) for release history and
[`.github/workflows/publish.yml`](.github/workflows/publish.yml) for the release
pipeline.
