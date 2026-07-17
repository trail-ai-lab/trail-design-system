---
"@trail/ui": minor
---

Section 5 (story/documentation coverage) of the design system audit. Mostly additive —
new stories and JSDoc comments — plus two small component changes surfaced while writing
them:

- `RecordingControl` gains an optional `defaultState` prop (`"idle" | "recording" |
  "paused"`, defaulting to `"idle"`) so its non-idle states can be demonstrated in
  Storybook without a real interaction. Real usage is unaffected — nothing currently
  passes this prop.
- `ActivityLogCard` now renders a proper empty state (icon + "No activity yet" +
  description) instead of a blank, headerless table when `events` is `[]`.

Also: added missing stories for `Collapsible` and `ScrollArea` (previously undocumented);
expanded `Sidebar`'s story coverage (skeleton loading, nested submenus, actions/badges,
outline variant, collapsed/icon mode); added JSDoc usage comments to all 18
`lab-website` components disambiguating near-duplicates (`NewsArchive` vs `RecentNews`,
`ResearchCard` vs `ResourceCard` vs `PublicationList`); documented the hand-added SLAI
status color tokens in `ColorPalette.stories.tsx`; added missing states to
`DropdownMenu`, `Combobox`, `RecordingControl`, and `ActivityLogCard` stories; and filled
smaller gaps in `Table`, `Chart`, `Sheet`, and `Typography` stories.
