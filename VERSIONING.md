# Versioning & releases

The design system follows [Semantic Versioning 2.0.0](https://semver.org). Every release is a
git tag `vMAJOR.MINOR.PATCH` that equals `version` in `package.json`, and consumers install a
tag:

```
pnpm add github:trail-ai-lab/trail-design-system#v1.0.0
```

`1.0.0` is the first stable release. From here on, the version number tells a consumer whether
an upgrade is safe:

| Bump      | Meaning for a consumer                                        | Example         |
| --------- | ------------------------------------------------------------- | --------------- |
| **MAJOR** | Upgrading may require code changes. Read the migration notes. | `1.4.2 → 2.0.0` |
| **MINOR** | New things to use; existing code keeps working unchanged.     | `1.4.2 → 1.5.0` |
| **PATCH** | Fixes only; nothing to change or learn.                       | `1.4.2 → 1.4.3` |

A bump resets the numbers to its right (`1.4.2` → minor → `1.5.0`, → major → `2.0.0`).

## Which number to bump

The public API is everything a consumer can depend on: the exports and subpaths in
`package.json`, every exported component, hook, helper, type and constant, their props (names,
types, defaults, required-ness), variant and size values, `data-slot` names, CSS files and the
tokens and utility classes they define, and the peer dependencies and Node engine range.

Ask: **would an app that upgrades without touching its code break, or behave differently in a
way it didn't opt into?** If yes, it's major.

### MAJOR — breaking changes

- Removing or renaming an export, subpath, component, hook, type or CSS file.
- Removing or renaming a prop, or making an optional prop required.
- Narrowing a prop's type (e.g. dropping a value from a `variant`, `size` or `status` union) or
  changing what a callback receives (`onSubmit(email)` → `onSubmit({ email })`).
- Changing a default so existing usage behaves differently (e.g. `GroupSwitcher` selecting the
  first group instead of "All groups").
- Removing a component's built-in behavior an app relies on (e.g. a confirm step, a link, a slot).
- Removing or renaming a token or utility class (`--success`, `text-h2`, `shadow-raised`), or
  changing a token's **meaning** (a hue that meant "warning" now means "info").
- Renaming or removing a `data-slot` value.
- Raising a peer dependency's minimum major (React 19 → 20) or the Node engine minimum.
- Adding a new required peer dependency or a new provider the app must render.

### MINOR — backward-compatible additions

- A new component, pattern, hook, helper, type, token, utility class or subpath.
- A new optional prop, a new `variant`/`size` value, a new callback.
- Widening a prop's type (accepting more than before).
- Intentional visual changes that need no code change: a redesigned component, adjusted spacing,
  a token value changed for design reasons while keeping its meaning.
- Deprecating something (see below).
- Raising a regular dependency (not a peer) to a new major, when consumers aren't affected.

### PATCH — fixes

- Bug fixes that bring behavior back in line with what's documented or intended.
- Accessibility fixes (contrast, focus rings, labels, keyboard support).
- Fixing visual glitches (clipping, misalignment, wrong token used).
- Internal refactors, performance work, dependency updates within the existing range.

### No release needed

Changes that don't alter what's shipped — stories, docs, tests, CI, lint config, the
`blocks/` reference content — don't need a version bump. They go out with the next release.

### When in doubt

Pick the bigger bump. A major that turns out to be safe costs consumers a read of the
changelog; a breaking change shipped as a minor breaks their build.

## Deprecations

Prefer deprecate-then-remove over removing outright:

1. In a **minor** release, keep the old API working, mark it `/** @deprecated Use X instead. */`
   and list it under **Deprecated** in the changelog.
2. Remove it in the **next major**, with migration notes.

## Changelog

Every release has a `CHANGELOG.md` entry. While working, add entries under `## Unreleased` in
the section that matches the bump:

- `### Major Changes` — each entry ends with _Migrate:_ steps.
- `### Minor Changes`
- `### Deprecated`
- `### Patch Changes`

The highest section present decides the version of the next release.

## Pre-releases

To try a release in a consumer (e.g. SLAI) before it's final, tag a pre-release:
`v1.1.0-rc.1`, `v1.1.0-rc.2`, … (set the same version in `package.json`). Consumers can install
`#v1.1.0-rc.1`; nobody should stay on one. Then release `v1.1.0`.

## Cutting a release

1. Decide the bump from the `## Unreleased` sections (above).
2. Set `version` in `package.json`.
3. Rename `## Unreleased` to `## X.Y.Z` and add a new empty `## Unreleased` above it. Update the
   install examples in `README.md` and `stories/GettingStarted.mdx`.
4. Run `pnpm check`, merge to `main`.
5. Tag the merge commit and push the tag:

   ```
   git tag vX.Y.Z && git push origin vX.Y.Z
   ```

## Rules

- **The tag equals `package.json` `version`**, always with a `v` prefix.
- **Tags are permanent.** Never move, delete or reuse a pushed tag — a consumer may have
  installed it. A bad release is fixed by releasing a new version.
- **Versions only go up.**
- Consumers upgrade by changing the tag in their own `package.json`, reading the changelog
  entries in between, and following any _Migrate:_ notes.

## History before 1.0.0

Tags `v0.1.0`–`v0.5.0` predate this policy and don't match the `package.json` version they
contain (see "Pre-1.0 history" in `CHANGELOG.md` for the mapping). They stay in place because
existing consumers pin them. Version numbering is consistent from `v1.0.0` on.
