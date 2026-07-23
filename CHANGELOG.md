# @trail/ui

## 0.3.0

### Minor Changes

- `Header`: add an optional `actions` prop, rendered between the nav links and the mobile menu
  button (visible on both desktop and mobile). Lets consumers drop in a theme toggle or similar
  control without forking the component. Non-breaking.

## 0.2.0

### Minor Changes

- a1a962f: Normalize component APIs toward Button's canonical patterns (Section 3 of the design
  system audit). Breaking prop renames:

  - `size` props across `Avatar`, `Card`, `Select`, `Switch`, `NativeSelect`, and
    `Sidebar`'s menu buttons now draw from a shared `ButtonSize` type exported from
    `ui/button.tsx`. `SidebarMenuSubButton`'s `size="md"` is now `size="default"`.
  - `LanguageChip`'s `kind` prop is now `variant`. `ResourceCard`'s `Resource` union
    discriminant is now `variant` instead of `type`. `ResearchCard`'s `item` prop is now
    `research`.
  - `DialogFooter`'s `showCloseButton` (the footer "Close" button) is now
    `showCloseAction`, disambiguating it from `DialogContent`'s `showCloseButton` (the
    corner close icon) — same name, two different elements, previously.
  - `SessionChatCard`'s `thinking` prop is now `loading`, matching `SummaryCard`.
  - `group-setup-form.tsx`'s internal `StepNumber` prop is now `isActive` instead of
    `active`.

  Non-breaking additions and fixes:

  - All 18 `lab-website` components now accept and forward `className`.
  - `InputGroupButton`'s `size="sm"` now actually renders at Button's real `sm` height
    (previously silently no-op'd at Button's default height due to the size prop never
    being forwarded).
  - Fixed callback-override bugs in `SidebarRail` and `InputGroupAddon` — a
    consumer-supplied `onClick` no longer silently replaces the built-in behavior.
    `Spinner`'s `role`/`aria-label` are now explicitly overridable.
  - `Publication.year` is now `number`, matching every other `year` field in the system.
  - `Combobox`'s `sideOffset` default changed from `6` to `4`, matching
    `Popover`/`DropdownMenu`.

- Prepare `lab-website` components for the trail-lab-website migration:

  - `EventDetail`: extend `EventDetailData` with `conferenceInfo`, `session`, `callForParticipation`,
    `submissionGuidelines`, `relatedPapers`, and an `actions` slot for app-level buttons (e.g. RSVP).
    `EventOrganizer` gains an optional `image`, rendered via `Avatar`. All additions are optional and
    non-breaking.
  - `Header`: fix the mobile menu button, which previously had no `onClick` handler and did nothing.
    It now opens a `Sheet` with the nav routes.
  - `Footer`: add an optional `showCrest` prop (default `true`) that renders the official UW crest
    graphic above the affiliation links, for visual parity with sites that previously hand-rolled it.
  - Add `trail/UwMasthead`, the University of Wisconsin–Madison compliance top bar (university +
    department links), shared chrome for any Trail tool site.
  - Add `trail/ModeToggle`, a light/dark/system theme switcher built on `next-themes` + `Popover` +
    `Tabs`, promoted out of a site-local implementation since the pattern is shared across tools.

- a1a962f: Section 5 (story/documentation coverage) of the design system audit. Mostly additive —
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

- a1a962f: Wire `lab-website` into the build and export map. `@trail/ui/lab-website` now resolves
  correctly for consumers — previously the subpath didn't exist in the published package
  despite the components being fully built.

### Patch Changes

- a1a962f: Fix invalid `hsl(var(--sidebar-border))` shadow (oklch wrapped in `hsl()` was silently
  dropped by the browser) and replace raw-color/arbitrary-value patterns with semantic
  tokens: `Slider` thumb now uses `bg-background`/`ring-foreground` instead of
  `bg-white`/`ring-black`; new `--overlay`, `--radius-card`, and `--radius-xs` tokens
  replace repeated `bg-black/30` and `rounded-[...]` arbitrary values in
  `AlertDialog`/`Dialog`/`Sheet`/`Card`/`Chart`/`Tooltip`; `Sidebar`'s width constants
  moved from JS into `--shell-sidebar-*` tokens in `layout.css`.

## 0.1.0

Initial release.

- `ui/` — full Shadcn-based primitive set (Radix + Base UI), exported from the package root.
- `slai/` — SLAI tool components (recording flow, transcripts, activities, sidebar shell).
- `lab-website/` — Trail Lab marketing site components (`@trail/ui/lab-website`).
- `aibat`, `bias-audit`, `casting-lab`, `murder-mystery`, `trail-console` — stub subpackages, no components yet.

From here on, changes are tracked via [changesets](https://github.com/changesets/changesets) —
see [`.changeset/README.md`](.changeset/README.md) for how to add one to a PR. This file is
appended to automatically by `changeset version`; don't hand-edit entries above this line once
a real release has shipped.
