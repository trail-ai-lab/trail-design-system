# @trail-ai-lab/trail-design-system

## Unreleased

### Major Changes

- **`RecordingCard` removed.** The quick recording page now shows `RecordingControl` directly in
  the content area, without a card, matching the student recording screen. _Migrate:_ render
  `<RecordingControl />` centered in the page (`flex flex-1 items-center justify-center
  p-(--shell-gap)`); the activity and language options are in the page toolbar.

- **`GroupSwitcher`: groups first, "All groups" last.** The first group is now the default
  selection instead of `ALL_GROUPS`. _Migrate:_ pages that seed their scope state with
  `ALL_GROUPS` should seed it with the first group's id; pass `defaultValue={ALL_GROUPS}` to keep
  the old default.

### Patch Changes

- **`StudentProgressView`:** the metric picker is now a `Tabs` list (matching Session review)
  above the progress chart, replacing the outline toggle group and its "Metric" label.
- **`ActivityViewer` (`variant="vidyamap"`):** the VidyaMap form now renders as a standalone,
  vertically centered card at form width (`max-w-sm`) instead of filling a full-size outer card.
- **Card headers are text only:** removed the header icon tile from `VidyaMapPlaceholder`,
  `ForgotPasswordForm` (sent state), `VerifyEmailCard` and `ResetPasswordCard` (invalid state).
  `VidyaMapPlaceholder`'s header is now left-aligned like the other in-app forms.
- **Clipped card edges in scroll containers:** `SessionEvidenceStrip` cards lost their top edge
  (a horizontal scroller clips vertically too); the strip now insets its content. The Activity,
  Invite and Language sheet bodies get a `pt-1` inset so the first item's focus ring isn't cut off.
- **Single-card pages are vertically centered** (`items-center-safe`) instead of top-aligned.

## 3.0.0

Install with `github:trail-ai-lab/trail-design-system#v3.0.0`.

### Major Changes

- **Platform: React 19 only.** `peerDependencies` are now `react`/`react-dom` `^19.0.0`; React 18
  and the unused `next` peer are dropped. Built against Next.js 16, Tailwind CSS 4, Storybook 10,
  TypeScript 6. Requires Node 20.9+.
- **`trail/` is now `patterns/`.** The shared layer is renamed to match standard design-system
  terminology. Root (`.`) exports are unchanged. _Migrate:_ nothing, unless you imported the
  short-lived `./trail` subpath — use `./patterns` instead.
- **Placeholder tool subpaths removed:** `./aibat`, `./bias-audit`, `./casting-lab`,
  `./murder-mystery`, `./trail-console` (they exported nothing). They return when a tool ships
  its first component.
- **SLAI exports removed** (unused by any SLAI screen): `CheckinDivider`, `ConversationTimeline`,
  `FileList`, `GroupBuilder`, `GroupCard`, `LanguageChip`, `LiveGroupCard`, `LiveWaveform`,
  `RetranscribeToolbar`, `ScopeToggle`, `SessionGroupList`, `SessionSetupForm`, `SourceMetaCard`
  (and their types `RosterStudent`, `SessionGroup`, `GroupPreset`, `UploadedFile`,
  `SessionSetupValues`, `TimelineSegment`, `InsightScope`, `SessionGroupListItem`).
- **`SlaiSidebar` follows the Class → Session model.** _Migrate:_ `sessions` → `classes`,
  `defaultOpenSession` → `defaultOpenClass`, type `SidebarSession { periods }` →
  `SidebarClass { sessions }`, type `SidebarPeriod` → `SidebarSession`,
  `SidebarItemTarget.kind` `"session" | "period"` → `"class" | "session"`, nav id `"manage"` →
  `"live"`. New `liveSessionActive` prop shows a "Now" marker on the **Live** nav item.
- **`GroupSwitcher`:** `SwitcherGroup.memberCount` and `chunkCount` removed; tabs show the name only.
- **SLAI formatters moved:** `@/components/slai/lib/format` → `@/lib/format` (`initials`,
  `formatDuration`, `formatElapsed`, `formatBytes`).
- **Status color tokens are aliases now:** `--status-recording/paused/uploaded` =
  `var(--destructive/--warning/--info)`. Paused amber is slightly deeper (`--warning` meets 4.5:1
  as text). "Stopped" status renders neutral instead of blue.

### Foundations

- **Token layers.** Hand-maintained tokens moved out of the generated `globals.css` into
  `semantic.css`, so regenerating the preset no longer drops them. Both new files are included in
  `styles.css`; `./semantic.css` and `./scales.css` are also exported. _Migrate:_ import `styles.css`
  instead of `globals.css` (or add `semantic.css` + `scales.css` after it).
- **Contrast fixes (WCAG AA):** dark-mode `--primary` is lighter (L 0.65) with dark
  `--primary-foreground` — 5.5:1 as text, was 2.35:1. Light `--muted-foreground` darkened to
  4.5:1 on `--muted`. `--ring` is now the brand primary and every focus ring is drawn at full
  strength (was 2.4:1 at best).
- **New scales** (`scales.css`): type `text-display|h1|h2|h3|title|body|body-sm|label|caption`,
  elevation `shadow-raised|overlay|modal`, motion `duration-fast|base|slow` and
  `ease-standard|emphasized`, stacking `z-raised|sticky|overlay|toast`.
- **Reduced motion:** all animation and transitions collapse when the OS setting is on.
- Removed the unused `--overlay` token.
- Foundations docs: new Radius, Elevation, Motion, Focus and Stacking pages; Typography documents
  the new scale. `SectionLabel` uses `text-label`.

### Primitives

- **All shadcn primitives updated** to the latest registry (`radix-rhea` style) via the new
  `pnpm ui:update` script: React 19 function components (no more `forwardRef`), improved focus
  styling for checkboxes and field labels, dropdown menus match their trigger width, calendar
  class handling fixes.
- **`cn` replaces `clsx` + `tailwind-merge`** (shadcn's compiled merge engine, same output).
  `cn` is now configured with Trail's scales, fixing a bug where `cn("text-label",
  "text-muted-foreground")` dropped the size (any `text-<scale>` combined with a text color).

### Quality gates

- **CI** (`.github/workflows/ci.yml`): format check, TypeScript, ESLint, unit tests, package and
  Storybook builds, and every story rendered in Chromium with axe accessibility checks — on every
  push and PR. Version tags must equal `package.json` `version`. Run it all locally with
  `pnpm check`.
- **ESLint** with Trail token rules: `trail/no-raw-colors` (palette colors, hex/rgb/hsl/oklch in
  class strings) and `trail/no-arbitrary-values` (`text-[…]`, `z-[…]`, `shadow-[…]`, …).
- **Prettier** with Tailwind class sorting; the repo is formatted once.
- **Storybook moved to Vite** (`@storybook/react-vite`) so stories run as Vitest browser tests;
  `next` is no longer a dev dependency. Chromatic (never configured) removed.
- **Accessibility fixes found by the new checks:** contrast of meaning colors on their own tints
  (`--warning`, `--destructive`, `--success`, `--info`, `--muted-foreground` darkened), faded
  text (opacity / `/70`) replaced, `SlaiSidebar` list structure, labels for language/speaker
  pickers and progress bars, `LanguageSettingsForm` duplicate IDs (now `useId`), `Dropzone`
  nested controls, footer heading order. Remaining upstream issues are disabled per rule, per
  story, with the reason.
- **Bug fixes:** `EventDetail` crashed when it had related papers (a duplicated heading inside
  `SectionLabel`); `RenameDialog` no longer resets its draft from an effect; the search
  shortcut label no longer sets state in an effect; `TranscriptCard` now shows its
  `translationLanguage`.
- _Migrate:_ wrap your app root in `TooltipProvider` (shadcn's Tooltip now requires it).

### Component conventions

- **API conventions** (CLAUDE.md "Component API Conventions"): `value`/`defaultValue`/
  `onValueChange`, `open`/`defaultOpen`/`onOpenChange` (all optional), `loading` vs a `status`
  union, `isX` booleans, `data-slot` on every component root, accessibility as part of the API.
  New `useControllableState` helper (`src/lib`).
- _Migrate:_
  - `LanguageMultiSelect`, `LanguageSettingsForm`, `LanguageSettingsSheet`: `onChange` →
    `onValueChange` (all now also accept `defaultValue`; the sheet accepts `defaultOpen`).
  - `StudentChip`: `selected` → `isSelected`.
  - `RecordingControl`: `pending` → `status`.
  - `RenameDialog`, `DeleteConfirmDialog`, `SaveRecordingDialog`, `GlobalSearch`: `open` and
    `onOpenChange` are optional; `RenameDialog` gains `trigger` + `defaultOpen`.
- **New pattern `StatusBadge`** (tone + icon or dot): `SessionStatusBadge`, `VerdictBadge` and
  `EventStatusBadge` are built on it. `EventStatusBadge` "Upcoming" is now a tinted primary pill
  (was solid), matching the other status pills.
- **`GroupSwitcher`** is a single-select toggle group (radio semantics) instead of tabs without
  panels; same look. Accepts `defaultValue`.
- **Accessibility:** live regions on the live transcript, chat and summary; `StudentChip` is
  keyboard-operable (`aria-pressed`); chat citations are real buttons; lab header links set
  `aria-current="page"`; pickers accept `aria-label`.
- **New primitives:** `pagination`, `navigation-menu`, `drawer`. `collapsible` and `scroll-area`
  are now exported (they were installed but missing from the package).
- **`formatClock`** (m:ss) added to `lib/format`, replacing the audio player's private copy;
  formatters have unit tests.

### Composition consistency

- **Summary on the right in both modes:** new `SummaryQaPanel` (Summary + Q&A tabs) is the right
  column on Live and Session review. Session review's left tabs are Goals, Transcript, Speakers,
  Activity; its primary toggle is now "Summary & Q&A". The All-groups view shows the panel full width.
- **Forms share one shape:** `GroupSetupForm` and `RecordingCard` are now Cards with a footer
  action; `NewSessionForm`'s description moved below its title; primary actions are default size.
  Task pages share one frame (top-aligned, `max-w-lg`; student screens `max-w-sm`).
- **Type scale in use:** headings across patterns, SLAI and the Lab Website use
  `text-h1|h2|h3` / `md:text-display`; new `text-hero` step for the home hero. Lab `h3`s now
  share one size (FocusAreas 24→20px, Pillars 18→20px).
- **Empty and error states:** transcript, chat, summary and search use `Empty`; search states
  render outside the result listbox; the sidebar gets "No sources yet". Blocking errors use one
  tinted `EmptyMedia`; inline errors use `Alert`; `IconTile` gains a `success` variant.
- **No nested cards / duplicated titles:** `VidyaMapPlaceholder` has `variant="embedded"`;
  recording panels no longer repeat the dialog title (_migrate:_ `RecordingUploadingPanel`'s
  `title` prop is removed).
- People rows use small avatars; `StudentInsightCard` shows one.
- All form IDs come from `React.useId()` (auth forms, new session, add source, recording,
  invite, VidyaMap). Field labels "Rename"/"File name" → "Name"; typographic ellipses (…).

### Minor Changes

- **Stylesheet entry `styles.css`** (recommended): imports the theme, layout tokens and font
  tokens, and adds the Tailwind `@source` for the package — no manual `@source` needed. Also
  exported individually: `./globals.css`, `./layout.css` (page-chrome spacing used by
  `AppShell`, previously not shipped), `./fonts.css` (default font families).
- **Meaning color tokens:** `--success`, `--warning`, `--info` (+ `-foreground`), contrast-checked
  in both themes. Rule: one hue, one meaning.
- **New shared patterns:** `SectionLabel`, `PageBreadcrumb`, `PersonRow`, `IconTile`, `CardLink`,
  `ConfirmDialog`. `ModeToggle` gains `size`.
- **New SLAI pieces:** `InsightItem`, `TranscriptQuote`; `InsightCallout` gains `title`;
  `TranscriptCard` gains `title`; `statusLabel()` helper.
- **New lab-website piece:** `EventStatusBadge`.
- SLAI cards, rows and badges rebuilt on `Card` / `Item` / `Badge` / `Progress`; lab-website cards
  use `CardHeader`/`CardAction` and default `CardTitle` sizing; section labels unified.
- End session, discard recording and generate-new-link now ask for confirmation.
- Accessibility: keyboard-operable chat suggestions and activity picker (arrow keys), screen-reader
  status for group tabs, larger hit areas for small icon buttons.

- Switch the color preset from teal/green to red: new `--primary`, `--sidebar-primary`, `--chart-1..5`, and neutral ramp (`--muted`, `--accent`, `--border`, `--input`, `--ring`, `--foreground`) values in `src/tokens/globals.css` for both light and dark. Hand-added tokens (`--status-*`, `--overlay`, `--radius-card`) are unchanged.

- Add `ResearchDetail`, a full single-page layout for one research area (title, funders, a
  rendered-content slot for markdown/MDX body copy, an optional people section, and an optional
  publications slot) — the research-page counterpart to `EventDetail`. The Research listing page
  had a card (`ResearchCard`) and a Storybook-only page recipe, but no detail-page layout; this
  fills that gap for consumers building a `/research/[id]`-style page.

  Also adds `ResearchIntro`, the Research listing page's opening section — a mission statement
  paired with a numbered FAQ list, split two-up. The `LabWebsite/Pages/Research` Storybook recipe
  now composes `PageHeader` + `ResearchIntro` + `Pillars` (reused for a "Contributions" icon grid)
  + `ResearchCard` grid, matching the homepage recipe's use of real, reusable section components
  instead of page-local markup.

## 2.1.1

### Patch Changes

- Every composed page story (`HomePage`, `NewsPage`, `PeoplePage`, etc.) was rendering
  `<LabFooter />` with no props, showing only the crest — Contact, Affiliations, and the
  feedback line never appeared since they're all conditional on props. Added a shared demo-props
  fixture (`stories/lab-website/lab-footer-demo-props.tsx`) and wired it into every composed page
  story so Storybook now shows the footer's full content everywhere. No component changes.

## 2.1.0

### Minor Changes

- `FocusAreas`: add an optional `iconClassName` prop (defaults to `size-16 text-primary`, matching
  prior behavior) so consumers passing a richer illustration instead of a small Lucide-style icon
  can size it appropriately. Also adds `overflow-hidden` to the icon card so larger icons stay
  clipped to its rounded corners.

## 2.0.3

### Patch Changes

- Add weight 400 to the Montserrat fallback `@import` in `globals.css`. Headings (`h1`–`h4`,
  and any `font-heading` element) render at `font-weight: 400` by default with no explicit
  weight utility, but the font-family only shipped 500/600/700 — so browsers substituted the
  nearest available weight (500), rendering every heading visibly heavier than intended.
  Consumers using their own font loader (e.g. `next/font`) for `--font-heading` should make sure
  it also includes weight 400.

## 2.0.2

### Patch Changes

- Fix duplicated dividers in `NewsArchive` and `EventDetail`'s important-dates list: both drew a
  leading border on the outer container _and_ a trailing border on every item (including the
  last), producing an extra line above the first item — redundant with a `PageHeader`'s own
  bottom border directly above it — and a stray trailing line after the last item. Switched both
  to the same "border between items only" pattern already used by `PublicationList`
  (`border-t` + `first:border-t-0`) for visual consistency across all list-style components.

## 2.0.1

### Patch Changes

- Update the neutral gray family in `globals.css` (`background`, `foreground`, `muted`, `accent`,
  `border`, `input`, `ring`, `sidebar-*`) to match the design system's actual preset — these had
  drifted to a different (cooler, bluer) neutral than intended. Also add a `::selection` rule using
  `--primary`/`--primary-foreground` so text selection is consistent with the theme instead of
  falling back to the browser default.

## 2.0.0

### Major Changes

- Move `UwCrest` and `UwMasthead` from the shared `trail/` namespace (and the root `.` export) into
  `lab-website/`. Both are specific to the marketing-site chrome and aren't used by any other tool,
  so they no longer belong in the cross-tool `trail/` namespace. Import them from
  `@trail-ai-lab/trail-design-system/lab-website` instead of the root package.

## 1.0.0

### Major Changes

- Remove `lab-website/Footer`. `LabFooter` now covers everything it did (UW compliance links via
  the crest + "Part of the Universities of Wisconsin", plus the copyright line) and more —
  there's no remaining reason to keep both. Consumers importing `Footer` should switch to
  `LabFooter`.

## 0.6.0

### Minor Changes

- `LabFooter`: replace the `coordinates` prop with a built-in copyright line (Logo + `labName` +
  `year`, matching `Footer`'s copyright text). `LabFooter` is now a complete, self-sufficient
  footer — pages using it no longer need to also render `Footer`.

## 0.5.0

### Minor Changes

- Add `lab-website/LabFooter`: the rich marketing-site footer band (UW crest + tagline, Contact,
  Affiliations, optional feedback/coordinates strip) that was previously bespoke per-consumer
  code. The crest doubles as the lab's identity mark, so it's not paired with a wordmark — pair
  with the plain compliance `Footer` underneath (`showCrest={false}`) for the University links
  and copyright line.

## 0.4.0

### Minor Changes

- Extract `UwCrest` (previously a private helper inside `Footer`) into its own `trail/UwCrest`
  component so consumers can place the crest graphic elsewhere on the page — e.g. as a lab's
  visual identity mark in a footer, replacing a redundant wordmark repeat. `Footer`'s own
  `showCrest` behavior is unchanged.

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
