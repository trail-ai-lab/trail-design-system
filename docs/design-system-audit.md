# Trail Design System — Audit Report (Phase 1)

**Scope:** `src/components/{ui,slai,lab-website}` (the real, shipping parts of the system) as primary focus; `src/components/blocks/*` (unmodified shadcn-studio template content, disconnected from every real tool) treated as low-priority noise and only summarized. `src/components/{aibat,bias-audit,casting-lab,murder-mystery,trail-console}` are currently empty stub packages with no components to audit.

**Status:** Read-only audit. Nothing in this report has been fixed yet — this is the input to Phase 2 planning.

---

## 1. Token Usage

### Tokens as defined today

`src/tokens/globals.css` (generated from the design preset — **never hand-edit**):
- Semantic colors + `-foreground` pairs: background, card, popover, primary, secondary, muted, accent, destructive, border, input, ring
- Sidebar colors: sidebar, sidebar-accent(+fg), sidebar-border, sidebar-primary(+fg), sidebar-ring
- Chart colors: chart-1…chart-5
- Hand-added status colors: `--status-recording`, `--status-paused`, `--status-uploaded` (flagged in-file as "not part of the generated preset" — regenerating the preset will silently drop these)
- Radius scale: `--radius` base + sm/md/lg/xl/2xl/3xl/4xl (calc-derived)
- Typography: `--font-sans`, `--font-heading` (family only — **no size/weight/line-height scale**)

`src/tokens/layout.css` (intentionally separate — page-chrome spacing, not preset-generated): `--shell-px`, `--shell-py`, `--shell-gap`.

**System-level gaps:** no spacing scale beyond Tailwind defaults, no shadow tokens, no type-scale tokens, no z-index tokens (though Tailwind's default z-scale is used consistently in practice, so this one isn't urgent).

### High priority

- **`src/components/ui/slider.tsx:52`** — `bg-white shadow-md ring-1 ring-black/10` on the slider thumb. Raw black/white instead of semantic tokens, in a primitive used everywhere.
- **`src/components/ui/sidebar.tsx:476`** — `shadow-[0_0_0_1px_hsl(var(--sidebar-border))]` and the hover equivalent. **Likely a real rendering bug**: `--sidebar-border`/`--sidebar-accent` are defined as `oklch(...)` values in globals.css, not HSL components — wrapping an oklch value in `hsl()` is invalid CSS. Should be `shadow-[0_0_0_1px_var(--sidebar-border)]` directly.

### Medium priority

- **Overlay scrim duplication**: `bg-black/30` repeated identically in `alert-dialog.tsx:39`, `dialog.tsx:42`, `sheet.tsx:38`. No semantic `--overlay` token exists — candidate for one.
- **Repeated radius clamp**: `rounded-[min(var(--radius-4xl),24px)]` repeated identically in `alert-dialog.tsx:61`, `card.tsx:15` (×3 within the rule), `dialog.tsx:64`. Collapse into a named token (e.g. `--radius-card`).
- **Missing small-radius token**: `rounded-[2px]` / `rounded-[5px]` appear in `checkbox.tsx:17`, `chart.tsx:223,314`, `tooltip.tsx:49` — no token exists below `--radius-sm` (6px). 3+ occurrences of `rounded-[2px]` alone justify a `--radius-xs` token.
- **Sidebar width constants not tokenized**: `src/components/ui/sidebar.tsx:27-29` — `SIDEBAR_WIDTH`/`SIDEBAR_WIDTH_MOBILE`/`SIDEBAR_WIDTH_ICON` are module-level JS constants, not entries in `layout.css`, despite `layout.css` existing specifically for shell/layout chrome values.

### Low priority

- `src/components/slai/invite-students-sheet.tsx:52` — `bg-white` on the QR code panel, but justified by an in-code comment (scanners need true white in both themes). Consider a dedicated `--qr-surface` token instead of a bare Tailwind class, but this is an intentional exception, not a bug.
- `src/components/ui/dropdown-menu.tsx:245` — `min-w-[96px]` vs. `min-w-32` elsewhere in the same file for what should be the same intent.
- `src/components/ui/calendar.tsx:91,100` and `src/components/slai/student-chip.tsx:29`, `transcript-card.tsx:92` — arbitrary micro text sizes (`text-[0.8rem]`, `text-[10px]`) with no type-scale token to reference (system-wide gap, see above).
- `src/components/lab-website/pull-quote.tsx:14`, `not-found.tsx:11` — one-off decorative arbitrary sizes, not duplicated elsewhere.
- No raw Tailwind color-shade classes (`bg-blue-500` etc.) were found anywhere in `ui/`, `slai/`, or `lab-website` — **the CLAUDE.md semantic-color rule is being followed cleanly** in the real components.

### `src/components/blocks/` (informational only)

Raw Tailwind color-shade classes appear in essentially all ~67 files — expected, since this is unmodified shadcn-studio demo content, not wired into any real tool (only its own `stories/_preview` stories and `PreviewShowcase*.stories.tsx`). Not actionable as individual findings; see Section 6 for a recommendation on what to do with this directory as a whole.

---

## 2. Duplicate / Near-Duplicate Components

### High priority

**`lab-website/*-card.tsx` reimplement card styling instead of using `ui/card.tsx`**
Files: `event-card.tsx`, `person-card.tsx`, `research-card.tsx`, and 4 of 5 branches of `resource-card.tsx`. None import `Card`; each hardcodes `rounded-4xl border border-border bg-card p-6` (or `p-5`) independently — copy-pasted across 4+ files. Worse, this is a *different visual language* than `ui/card.tsx` (which uses `ring-1 ring-foreground/5 shadow-sm`, no border, plus the `--card-spacing` token) — so lab-website cards look structurally different from every `slai/*-card.tsx`, which correctly composes `ui/card.tsx`.
- **More robust:** `ui/card.tsx` — token-driven, proper slotting, already the pattern all of `slai/` follows correctly.
- **Consolidation:** Rewrite the 4 lab-website card components to compose `Card`/`CardContent`/`CardHeader`/`CardTitle` (`asChild` for anchor-wrapped variants), then decide which visual language (bordered vs. ring/shadow) becomes canonical — don't ship two.

### Medium priority

- **Chip components reimplement `Badge` + `Avatar`**: `src/components/slai/student-chip.tsx` hand-rolls its own pill (`rounded-full border ...`) and its own mini-avatar circle (`rounded-full bg-muted text-muted-foreground`) rather than composing `Badge`/`Avatar` the way `language-chip.tsx` correctly does. Result: a third pill corner-radius (`rounded-full`) alongside `Badge`'s `rounded-2xl`. **Fix:** rebuild on `Avatar size="sm"` + a pill wrapper matching `Badge`'s shape, keep the remove-button behavior.
- **`lab-website/not-found.tsx` hand-rolls an empty state instead of using `ui/empty.tsx`**, even though two other components in the same repo (`slai/mic-permission-error.tsx`, `GroupsEmptyState` in `transcript-card.tsx`) already use `Empty`/`EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription` correctly for the identical shape. **Fix:** rewrite `NotFound` to match that pattern.
- **Near-copy-paste transcript row**: `TranscriptRow` (`slai/transcript-card.tsx`) and `RecordedRow` (`slai/recorded-transcript-card.tsx`) are >70% line-for-line identical (leading badge/avatar → meta line → original text → optional translation line, same classes). Only the leading element differs. **Fix:** extract a shared `TranscriptUtteranceRow` taking a `leading` slot.

### Low priority

- **`RecentNews` embeds a near-duplicate of `NewsArchive`'s list**: identical `<ul>`/`<li>` grid structure, only column width (`8rem` vs `10rem`) and outer margin differ; `NewsEntry`/`NewsItem` types are structurally identical but separately declared. **Fix:** have `RecentNews` render `<NewsArchive items={items} className="mt-12" />` with a column-width prop added, drop the duplicate type.

### Explicitly checked, not duplicates

Sheets (`invite-students-sheet.tsx`, `language-settings-sheet.tsx`, `ActivityPickerSheet`) all correctly compose `ui/sheet.tsx`. Dialog/AlertDialog/Sheet are non-overlapping. All 8 `slai/*-card.tsx` components correctly compose `ui/card.tsx` (the pattern lab-website should follow). `SessionStatusBadge` correctly wraps `Badge`. `LiveWaveform` vs. the inline `Waveform` in `audio-player-card.tsx` look similar but are functionally unrelated (live mic capture vs. static playback fill) — not a duplicate.

---

## 3. API Consistency

Full per-component prop inventories were extracted for all 42 `ui/`, 26 `slai/`, and 18 `lab-website/` components during this audit. Rather than reproduce ~90 components' full prop tables here, this section reports the actionable inconsistencies found in that inventory — this is the material Phase 2 should normalize against.

### High priority

- **`className` passthrough is entirely absent from `lab-website/`** — all 18 components (`Header`, `Footer`, `Hero`, `PageHeader`, `PersonCard`, `EventCard`, etc.) accept zero style-override mechanism, vs. near-universal `className` support in `ui/` and `slai/`. This breaks composability for any consuming app that needs to adjust spacing/layout without forking the component.
- **`size` prop enum is different on nearly every component that has one**, with no shared type: `avatar.tsx:13` `"default"|"sm"|"lg"`; `card.tsx:9` `"default"|"sm"`; `select.tsx:40` / `switch.tsx:11` / `native-select.tsx:7` `"sm"|"default"`; `button.tsx` (cva) 8 values including `icon-*` variants; `input-group.tsx:70-75` (cva) 4 values, a narrower/different set from Button's; `item.tsx:45-49` `"default"|"sm"|"xs"`; `sidebar.tsx:478-482` (menu button) `"default"|"sm"|"lg"`; `sidebar.tsx:658` (menu sub-button) `"sm"|"md"`. Nine independently-declared `size` unions, same prop name, no canonical scale.
- **`showCloseButton` default flips within the same file**: `dialog.tsx` — `DialogContent` defaults it to `true` (line 53), `DialogFooter` defaults the *same prop name* to `false` (line 100). Confusing and easy to get wrong when composing the two.
- **Inconsistent style-variant naming for the same concept**: `variant` is the dominant name (Badge, Alert, Button, Toggle, Item, AlertDialog size aside) but `language-chip.tsx`'s `kind: "spoken" | "translation"` and `resource-card.tsx`'s `type: "tool" | "video" | "pdf" | "dataset" | "workshop" | "tutorial"` use different names for the same "which visual/structural variant" role.
- **Object-wrapper prop naming has no convention**: every lab-website "card" takes a single data-object prop, but the prop name varies per component with no rule — `EventCardProps.event`, `PersonCardProps.person`, `ResearchCardProps.item`, `ResourceCardProps.resource`.

### Medium priority

- **Boolean naming for "is this the active one" is inconsistent**: component prop `isActive` (`SidebarMenuButton`, `SidebarMenuSubButton`) vs. data-field `active` (`SwitcherGroup.active`, `SidebarPeriod.active`, `TranscriptGroup.active`) — same concept, two names, depending on whether it's a component prop or a data field.
- **"Pending/async" state is named differently per component**: `SummaryCard.loading` (boolean) vs. `SessionChatCard.thinking` (boolean) — both represent "an async operation is in flight," different vocabulary.
- **`sideOffset` default is arbitrary and inconsistent** across sibling overlay components: `popover.tsx:21` = 4, `dropdown-menu.tsx:35` = 4, `combobox.tsx:92` = 6, `tooltip.tsx:33` = 0.
- **Repeated inline status/shape types instead of a shared exported type**: `status: "upcoming" | "past"` is independently declared 3 times (`EventCardItem`, `EventDetailData`, the workshop/tutorial branch of `Resource`); the `{ label: string; href: string }` action shape is independently declared in `hero.tsx` and `join-cta.tsx`.
- **`asChild: boolean` is redeclared inline ~10+ times** (`badge.tsx`, `breadcrumb.tsx`, `button.tsx`, `button-group.tsx`, `item.tsx`, 5× in `sidebar.tsx`) rather than centrally typed — pure duplication, not a bug, but worth a shared type if touching these files anyway.
- **`Publication.year: string`** is the outlier — every other `year` field in the system (`EventCardItem`, `EventDetailData`, the Resource workshop/tutorial variant) is `number`.
- **Callback composition is inconsistent and risk-prone**: `sidebar.tsx`'s `SidebarTrigger` correctly composes a consumer-supplied `onClick` with its internal `toggleSidebar` call, but `SidebarRail` (same file) and `InputGroupAddon` (`input-group.tsx:55-61`) hardcode their own `onClick` *before* `{...props}` spreads — meaning a consumer-supplied `onClick` silently overrides the built-in behavior with no warning. `spinner.tsx` has the opposite risk (hardcoded `aria-label`/`role` before the spread, so those actually can't be overridden safely either way you look at it). This is a latent-bug class, not just a style nit.

### Low priority / type-safety notes

- **No `any` usage anywhere** in `ui/`, `slai/`, or `lab-website` — confirmed by grep across all three directories. This axis is clean.
- **No boolean-prop-sprawl components found** — the worst offenders are `ComboboxInput` (3 booleans: `disabled`, `showTrigger`, `showClear`) and `SidebarMenuButton`/`SidebarMenuAction`/`SidebarMenuSubButton`/`SidebarProvider` (2 booleans each). None cross a threshold that would justify a compound-component split. The `show*` naming convention (`showIcon`, `showTrigger`, `showClear`, `showCloseButton`, `showOutsideDays`, `showRemove`, `showOnHover`) is actually used *consistently* everywhere it appears — worth preserving as the house style when adding new boolean toggles.
- **Type/rendered-element mismatches** (props typed for one HTML element, component renders another): `empty.tsx:71` (`EmptyDescription` typed as `<"p">`, renders `<div>` at line 73), `kbd.tsx:16-18` (`KbdGroup` typed as `<"div">`, renders `<kbd>`), `popover.tsx:56-58` (`PopoverTitle` typed as `<"h2">`, renders `<div>`). Small, but means TS autocomplete/inference lies about what DOM element you're styling.
- **`className` doesn't reach the element you'd expect**: `native-select.tsx` — passing `className` styles the wrapper `<div>`, not the `<select>` itself (which has a hardcoded class string with no merge). `table.tsx` — `className` only reaches the inner `<table>`, not the scroll-container `<div>` wrapping it.
- **Two different component-prop typing conventions coexist**: ~30 files do `cn(variants(...), className)`; `button.tsx`, `empty.tsx`, `item.tsx` (×2), `toggle.tsx` merge className *inside* the `cva()` call instead. Cosmetic, but worth picking one when these files are next touched.
- **`combobox.tsx` is the only file using `@base-ui/react`** (Base UI) instead of `radix-ui`, with its own `ComboboxPrimitive.X.Props` typing convention rather than the `React.ComponentProps<typeof X>` pattern every other primitive uses. Not wrong, just worth knowing before extending it.

---

## 4. Accessibility

### High priority

- **Suggested-question chips in chat are mouse-only**: `src/components/slai/session-chat.tsx:118-126` renders `<Badge variant="outline" className="cursor-pointer" onClick={...}>` — `Badge` renders a plain `<span>` (not `asChild`), which is not in the tab order and has no default keyboard activation. Keyboard/screen-reader users cannot use these at all.
- **Language-settings selects aren't labeled**: `src/components/slai/language-settings-form.tsx:170,178` — `<FieldLabel htmlFor="slai-language-1">`/`"slai-language-2"` wrap a `LanguageSelect` that never accepts/forwards an `id` prop (its `<SelectTrigger>` at line 69 has none), so no DOM element actually has those IDs. The label is programmatically disconnected from the control on both usages (new-session card and the Language Settings sheet). Contrast with `new-session-form.tsx:76-90`, which does this correctly.
- **Group status conveyed by color alone**: `src/components/slai/group-switcher.tsx:56-66` — each group tab shows recording/paused/uploaded status *only* via a colored dot (plus `animate-pulse` for recording), no text or icon. A colorblind user can't tell "paused" from "uploaded." `SessionStatusBadge` (used elsewhere) always pairs color with a text label — `GroupSwitcher` should match that pattern.
- **No live-region announcements for the recording flow**: `src/components/slai/recording-control.tsx` (elapsed timer, lines 45-52; state caption, lines 94-100) has no `aria-live`, so starting/pausing/resuming a recording is silent to screen reader users. Same gap in `src/components/slai/transcript-card.tsx:213-233` (live transcript rows arrive with no `aria-live="polite"`). These are the core interaction of the SLAI recording tool.

### Medium priority

- **No `aria-current` on active nav items**: `src/components/ui/sidebar.tsx:491-516,653-676` (`SidebarMenuButton`/`SidebarMenuSubButton`) only set `data-active` for styling. Propagates to `src/components/slai/slai-sidebar.tsx:153,193`. Also `src/components/lab-website/header.tsx:24-34` — active nav link has no `aria-current="page"`.
- **Icon-only combobox controls lack `aria-label`**: `src/components/ui/combobox.tsx:39-50` (`ComboboxClear`) and `:234-262` (`ComboboxChip`'s remove button) both wrap only an `<XIcon/>` with no accessible name — confirmed Base UI supplies none by default either. Contrast with `DialogClose`/`SheetClose` in this same codebase, which both include `sr-only` text.
- **New chat messages aren't announced**: `src/components/slai/session-chat.tsx:190-227` — no `aria-live` around the message list.
- **Mic-permission error isn't announced**: `src/components/slai/mic-permission-error.tsx` has no `role="alert"`/`aria-live`, so if it's swapped in dynamically after a permission denial, screen reader users get no proactive notice.

### Low priority

- `src/components/slai/activity-picker.tsx:57` — `<ItemGroup role="radiogroup">` has no accessible name of its own (individual items are fine).
- `src/components/slai/activity-log-card.tsx:58-91` — renders a `Table` with no header row; likely should be a list, not a `<table>`, if it's staying headerless.

### Clean

Every `ui/` primitive read (Radix/Base UI-backed) consistently pairs `outline-none`/`outline-hidden` with a `focus-visible:ring-*` replacement — no missing-focus-state issues found. No missing `alt` text anywhere — both real `<img>` usages (`person-card.tsx`, `person-profile.tsx`) set real alt text, and every avatar in `slai/` uses `AvatarFallback` (initials), not an unlabeled image.

---

## 5. Story / Documentation Coverage

### High priority

- **`src/components/ui/collapsible.tsx`** — no story at all in `stories/ui/`.
- **`src/components/ui/scroll-area.tsx`** — no story at all, despite being used internally by `session-chat.tsx` and others.
- **`stories/ui/Sidebar.stories.tsx`** — a single 77-line `Default` story against a 703-line source that also exports `SidebarMenuSkeleton` (loading state), nested submenu components, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarRail`, an `outline` button variant, and collapsed/`icon` mode — none demonstrated. This is a structural component reused by both `AppShell` and `SlaiSidebar`; its gaps are load-bearing.
- **`lab-website/` has zero JSDoc/usage-doc comments across all 18 files**, vs. 26/26 in `slai/`. The `slai/` files set a real precedent — e.g. `activity-card.tsx` explicitly says *"for selecting an activity in a session, use ActivityPicker instead"*. Nothing in `lab-website/` disambiguates `news-archive.tsx` vs. `recent-news.tsx` (near-duplicate, see Section 2) or `research-card.tsx` vs. `resource-card.tsx` vs. `publication-list.tsx` (three adjacent "content list" patterns with no note on when to use which).
- **`stories/trail/ColorPalette.stories.tsx` doesn't document the hand-added status tokens** (`--status-recording`/`-paused`/`-uploaded`) at all, even though project memory already flags these as easy to lose on preset regeneration — this is exactly the token that should be pinned in living documentation and currently isn't.

### Medium priority

- **`stories/ui/DropdownMenu.stories.tsx`** and **`Combobox.stories.tsx`** — single `Default` story each; neither demonstrates checkbox/radio/submenu items (DropdownMenu) or multi-select chips mode / the empty-results state (Combobox).
- **`stories/slai/RecordingCard.stories.tsx`** / **`RecordingControl.stories.tsx`** — only ever show the idle state; recording/paused states exist nowhere in Storybook even though `SessionStatusBadge` and `GroupSwitcher` reference those same three states elsewhere.
- **`stories/slai/ActivityLogCard.stories.tsx`** — no empty-state story (`events: []`), even though the empty case is a realistic "no activity yet" scenario.
- No `.mdx` docs exist anywhere, and no story sets `parameters.docs.description.component` — the only usage guidance that exists is inline JSDoc (autodocs-driven), so it's fragile/inconsistent by construction rather than by policy.
- **No Radius/Shape foundations page** exists despite a full `--radius-sm`→`--radius-4xl` scale being used throughout the system.

### Low priority

- `stories/ui/Table.stories.tsx` (no empty/loading state), `Chart.stories.tsx` (bar chart only), `Sheet.stories.tsx` (`side` only shows 2 of 4 values) — minor, not urgent.
- `stories/trail/Typography.stories.tsx` is a good visual scale showcase but doesn't map sizes back to their actual token/class names (contrast with `Spacing.stories.tsx`, which does this well and should be the template).

### Working well (cite as the bar to match)

- `stories/slai/SummaryCard.stories.tsx` (Empty/WithSummary/AllGroups/Loading) and `stories/slai/SessionChat.stories.tsx` (Empty/Conversation/Thinking) fully cover their real states with explanatory comments.
- `stories/foundations/Spacing.stories.tsx` — real prose on the 4pt grid, layout vs. component tokens, and a rendered token table.
- All 26 `slai/` and all 18 `lab-website/` components do have a matching story file (once accounting for fuzzy naming) — the gap is state coverage and docs, not missing stories outright, except for the two `ui/` components noted above.

---

## 6. Structure & Versioning

### Current shape

`@trail/ui` (package.json) exposes subpath exports for `.`, `./slai`, `./aibat`, `./casting-lab`, `./murder-mystery`, `./trail-console`, `./bias-audit`, and `./globals.css`, built via `tsup` (cjs+esm+dts) and published to GitHub Packages (`npm.pkg.github.com`).

### High priority

- **`lab-website/` is fully built (18 components, its own barrel `index.ts`, 29 story files) but is not wired into either `tsup.config.ts`'s `entry` map or `package.json`'s `exports` map.** Every other tool subpackage (slai, aibat, casting-lab, murder-mystery, trail-console, bias-audit) has a build entry and an export path; lab-website has neither. As it stands, an external repo cannot `import { Header } from "@trail/ui/lab-website"` — the subpath simply doesn't exist in the published package. This is the single biggest "will break external consumption" gap found in the audit.
- **No automated version bumping, and the publish workflow runs on every push to `main` with no gate.** `.github/workflows/publish.yml` runs `pnpm publish --no-git-checks` on every push to `main`. `package.json` is still at `0.1.0` and there are **no git tags** in the repo despite ~14+ feature/fix commits on `main`. Either: (a) publishes are silently failing after the first one (npm/GitHub Packages reject republishing an existing version), or (b) someone is manually bumping the version out-of-band before each merge. Either way, there's no changeset/semantic-release tool, no CHANGELOG, and no visible policy — a consuming repo has no reliable way to know if pulling latest gets them a breaking change.
- **No README.md and no CHANGELOG.md anywhere in the repo.** For a package explicitly `"description": "Trail Lab design system — shared UI components for SLAI, AIBAT, Casting Lab, Murder Mystery, Trail Console, and Bias Audit"` meant to be installed by other teams' repos, there's no onboarding doc describing install steps, which subpath to import from, how `globals.css` needs to be pulled in, or a deprecation/breaking-change policy.

### Medium priority

- **5 of 7 declared subpackages are empty stubs**: `aibat`, `bias-audit`, `casting-lab`, `murder-mystery`, `trail-console` each contain only a placeholder `index.ts` ("Add exports here as components are created") with zero components. Not wrong at this stage, but means the "shared source for lab website and internal tools" framing is currently ~2/7 real (slai + lab-website, and lab-website isn't even wired up — see above).
- **`src/components/blocks/preview/` and `blocks/preview-02/`** (~50 files, ~67 including stories) are unmodified shadcn-studio template/demo content — not consumed by any real tool, not exported by the package, only rendered by their own `stories/_preview/*` and `stories/pages/PreviewShowcase*.stories.tsx`. This roughly doubles the audit surface of the repo (67 files) for zero production value, and could confuse a new contributor about what's "real" vs. reference material. Recommend an explicit decision: delete it, or clearly quarantine it (e.g. a `stories/_preview` README noting "reference only, not part of the shipped system, do not import from src/components/blocks").

### Low priority / things to confirm with the user (can't verify from this repo alone)

- Whether any consuming tool repo currently does a deep import into `@trail/ui/dist/...` internals rather than the barrel/subpath exports — worth a quick grep across the actual tool repos before Phase 2, since fixing exports here won't help if consumers already bypass them.
- `components.json` (shadcn CLI config) is present and correctly scoped (`css: src/tokens/globals.css`, aliases matching `src/components/ui`) — this part of the structure is healthy and matches the CLAUDE.md rule that `ui/` components must be CLI-installed, not hand-written.

---

## Summary — what to tackle first in Phase 2

If prioritizing by "blocks external teams from safely adopting this" impact:

1. Wire `lab-website` into `tsup.config.ts` + `package.json` exports (Section 6) — otherwise nothing else here matters for that tool.
2. Fix the sidebar `hsl(var(--sidebar-border))` bug and the slider raw-color thumb (Section 1) — both are shipping visual bugs, not style nits.
3. Decide a version/release policy before the next merge to `main` — the publish workflow is running blind right now (Section 6).
4. Consolidate the `lab-website/*-card.tsx` vs. `ui/card.tsx` split (Section 2) before more lab-website components get built on the wrong pattern.
5. Fix the four accessibility High findings (Section 4) — keyboard-inaccessible chat suggestions, disconnected form labels, color-only status, and silent recording state are all real usability blockers for the tool this system already ships.

Everything else (naming conventions, story-state coverage, token gaps) is real but lower urgency and can be worked through systematically once the above are settled.
