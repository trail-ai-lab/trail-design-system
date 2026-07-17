# `blocks/` — design inspiration only

This directory contains unmodified [shadcn-studio](https://shadcnstudio.com/) template
content (`preview/` and `preview-02/`), kept in the repo purely as visual reference for
building new components.

**Rules for this directory:**

- Not part of the shipped `@trail/ui` package — it has no build entry in
  `tsup.config.ts` and no subpath in `package.json`'s `exports` map.
- Never imported directly by `ui/`, `slai/`, or `lab-website/` components. If you find a
  pattern here worth reusing, rebuild it on top of `ui/` primitives and semantic tokens
  instead of importing from `blocks/`.
- Only consumed by its own stories (`stories/_preview/**` and
  `stories/pages/PreviewShowcase*.stories.tsx`) so it can be browsed in Storybook.
- Contains raw Tailwind color classes and other patterns that don't follow this repo's
  [CLAUDE.md](../../../CLAUDE.md) component rules — that's expected here and not a bug to fix.
