# Trail Design System - Claude Code Rules

## Purpose & Scope

- This is the shared design system for every TRAIL lab tool. All tools should look consistent and follow the same structure; layouts vary with each tool's needs, but the overall feel stays the same.
- Current consumers: the **Lab Website** (`src/components/lab-website/`, already built on this system) and **SLAI** (`src/components/slai/`, the first tool being designed). More tools will follow and most of what they need will be shared. Until then, design for these two. (Other `src/components/{tool}/` folders exist but are not in active scope.)
- Structure it like a standard design system: foundations (tokens) → primitives (`ui/`) → shared patterns (`patterns/`) → tool-specific components (`{tool}/`) → page stories. When a pattern appears in two places (e.g. Lab Website and SLAI, or two SLAI screens), promote it to `patterns/` instead of duplicating it.

## Visual Direction

- `src/components/blocks/preview` and `blocks/preview-02` are unmodified shadcn examples and the visual bar for the whole system: aim for the same polish and consistency.
- Use them as inspiration only: reach for the same `ui/` primitives they compose (Card, CardHeader/CardAction, Table, Badge, Avatar, Field, Empty, …) and match their hierarchy, spacing and density — rebuilt with semantic tokens.
- NEVER modify anything under `blocks/` or the content of its stories (`stories/_preview/**`, shown in Storybook under **Preview**: Showcase 01/02, Blocks 01/02), never import from it, and never copy its raw class strings. Only story titles/organization may change.

## Platform & Releases (decided 2026-10-07)

- **Brand:** red is the primary color (TRAIL lab theme). Use it the way shadcn uses `--primary`: main call-to-action buttons, active/selected states, focus and links. Don't use red to express meaning (that's `destructive`/status tokens); destructive actions are distinguished by their `destructive` variant and a confirmation step.
- **Platform:** latest versions only — React 19, current Next.js, Tailwind CSS v4, current Storybook. No React 18 / older Next support; tools upgrade to match.
- **Releases:** consumers install from git tags (`github:trail-ai-lab/trail-design-system#vX.Y.Z`). The tag must equal `package.json` `version`; record every change in CHANGELOG.md, and breaking changes bump the major version with migration notes.

## SLAI Product Model

- Object model, used in every label, prop and type: **Class** (Physics) → **Session** (one class meeting, e.g. "Period 3 — Aug 21") → **Group** → **Recording**. **Sources** are material outside a session (quick recordings, uploaded documents).
- SLAI has two modes with different priorities:
  - **Live** (nav item "Live", page stories `SLAI/Pages/Live`) — used during class: watching groups, live transcript, quick summary/Q&A. Glanceable and low-friction. The nav item shows a "Now" marker while a session runs.
  - **Session review** (opened from the sidebar's "Sessions" tree, page stories `SLAI/Pages/Session`) — used after class: recordings, diarized transcripts and speakers, goals/WIDA verdicts, summary, Q&A. Deeper analysis.
- Keep the two modes structurally consistent:
  - Layout: primary content on the left (transcript / analysis tabs), AI panels (Summary, Q&A) on the right.
  - Session timing lives in the toolbar (`RecordingTimer compact`), never in the breadcrumb title.
  - Page titles use `PageBreadcrumb`; page stories use the shared `PageSidebar` from `stories/slai/_page-fixtures.tsx`.
- Irreversible or disruptive actions (end session, delete, discard, reset an invite link) always go through `ConfirmDialog` / `DeleteConfirmDialog`.
- Copy is sentence case everywhere (nav, titles, buttons, tabs).

## Component Rules

- NEVER use raw Tailwind color classes: bg-blue-500, text-gray-600, border-gray-200
- ALWAYS use semantic classes: bg-primary, text-muted-foreground, border-border
- Layout and spacing classes are fine: p-4, gap-2, flex, grid, w-full
- Check src/components/ui/ before building any new component
- Check src/components/patterns/ before building tool-specific components

## New Components

- Shadcn components go in src/components/ui/ (installed via CLI only, never manually). Update them all with `pnpm ui:update` (or `pnpm ui:update <name>`), then review `git diff src/components/ui`. Everything imports `cn` from `@/lib/utils` — it's configured with Trail's scales; never import from `cn`, `clsx` or `tailwind-merge` directly.
- Shared patterns (used across tools) go in src/components/patterns/
- Tool-specific components go in src/components/{tool}/
- Every new component must have a corresponding story in stories/{namespace}/
- Placeholder tool folders (`aibat`, `bias-audit`, …) have no package entry; when a tool gets its first component, add it to `tsup.config.ts` and `package.json` `exports`

## Composition Patterns (one shape per job)

- **Single-task forms** (new session, add source, group setup, auth, recording): `Card` → `CardHeader` (`CardTitle`, then `CardDescription` — never above it) → `CardContent` with `FieldGroup` → `CardFooter` with one full-width, default-size primary action. Optional fields say "— optional"; no asterisks.
- **Page frames:** in-app task pages are top-aligned, `p-(--shell-gap) pt-8`, forms `max-w-lg`; student (phone) screens `max-w-sm`, top-aligned. Content areas pad with `--shell-gap`.
- **Headings** use the type scale by role: page title `text-h2 md:text-h1` (marketing `md:text-display`, home hero `lg:text-hero`), section `text-h2 md:text-h1`, subsection and dialog/auth card titles `text-h3`, card titles default `CardTitle`.
- **Empty states:** always `Empty` (`EmptyMedia variant="icon"` + `EmptyTitle` + `EmptyDescription`, actions in `EmptyContent`). Inside a listbox (cmdk), render states outside the list — only options belong in it.
- **Errors:** inline → `Alert variant="destructive"`; blocking → `Empty` with `EmptyMedia` tinted `bg-destructive/10 text-destructive`. Status icons outside an `Empty` use `IconTile` (`destructive` / `success` variants).
- **No nesting:** a card never renders inside another card — give the inner one an `embedded` variant. A dialog's title isn't repeated in its body.
- **People in lists** get an `Avatar size="sm"` (or `PersonRow`); color dots only where color is the key (speaker mapping).
- **AI panel:** Summary and Q&A live together in `SummaryQaPanel`, always in the right column, in both Live and Session review.

## Component API Conventions (Radix/shadcn style)

- **Controlled values:** `value` / `defaultValue` / `onValueChange` — never `onChange` for a component's value (`onChange` is only for native inputs passed through). Both `value` and `onValueChange` are optional; without `value` the component manages its own state from `defaultValue`.
- **Open state:** `open` / `defaultOpen` / `onOpenChange`, all optional, on every dialog, sheet, popover and menu-like component.
- **Events:** `on<Event>` for things that happen (`onSubmit`, `onDelete`, `onSelectStudent`); `on<Prop>Change` only for controlled props.
- **Async:** `loading` (boolean) for one in-flight operation. A component with several phases takes a `status` union instead (`"idle" | "sending" | "sent"`, `"connecting" | "stopping"`), never `pending` or ad-hoc booleans.
- **Booleans** describing a component's own state read as `isX` (`isActive`, `isSelected`, `isLatest`); domain data fields stay plain (`active`, `selected`) — see below.
- **Roots:** every component renders `data-slot="<component-name>"` on its root element (styling hook, matching `ui/`) and accepts and merges `className`.
- **Accessibility is part of the API:** icon-only buttons take an `aria-label`; any `role="combobox"` trigger needs a `<label htmlFor>` or `aria-label` (comboboxes don't take their name from content); IDs come from `React.useId()`, never hard-coded; streaming content (live transcript, chat, summaries) is a live region.

## Prop Naming

- `size` props: draw from Button's canonical scale (`xs | sm | default | lg | icon | icon-xs | icon-sm | icon-lg`, exported as `ButtonSize` from `src/lib/types.ts`). Use `Extract<ButtonSize, ...>` for the subset a component needs — never invent a new size name (e.g. `md`).
- `variant` is the standard name for "which visual/structural variant" of a component — not `kind`, `type`, or other synonyms (see `insight-callout.tsx`, `resource-card.tsx`). Domain data may still use `type`/`kind` for what a thing _is_ (`SidebarSource.type: "audio" | "pdf"`, `SidebarItemTarget.kind`).
- lab-website "card" components (`EventCard`, `PersonCard`, `ResearchCard`, `ResourceCard`, `EventDetail`, `PersonProfile`) take a single data-object prop named after the domain it represents (`event`, `person`, `research`, `resource`) — not a generic name like `item` or `data`.
- Every lab-website component accepts and forwards a `className` prop, matching `ui/` and `slai/`.
- "Is this the active one" uses `isActive` for component props (`SidebarMenuButton`, `SidebarMenuSubButton`, `StepNumber`) and `active` for data fields on domain interfaces (`SwitcherGroup.active`, `SidebarPeriod.active`, `TranscriptGroup.active`) that get read into `isActive` at render time. This split is intentional — keep it.
- "An async operation is in flight" uses `loading` (`SummaryCard.loading`, `SessionChatCard.loading`) — not `thinking`, `pending`, or other synonyms.
- Radix `asChild?: boolean` props intersect the shared `AsChildProp` type from `src/lib/types.ts` rather than redeclaring the field inline.
- Overlay `sideOffset` follows the shadcn defaults: `4` for Popover and DropdownMenu, `6` for Combobox, `0` for Tooltip (its arrow's position math assumes a flush relationship with the trigger). Don't override them per instance.

## Token Rules

- All colors must come from CSS variables in src/tokens/globals.css
- Never hardcode hex values, rgba, or hsl values directly in components
- Never modify globals.css — it is generated from the shadcn preset (components.json) and only ever replaced by regenerating it. Everything Trail adds or adjusts lives in hand-maintained files imported after it (all bundled by `styles.css`):
  - `semantic.css` — meaning colors (`success`/`warning`/`info`), status aliases, contrast fixes to preset values, the full-strength focus ring, `rounded-card`.
  - `scales.css` — type scale, elevation, motion, z-index utilities, reduced-motion handling.
  - `layout.css` — page-chrome spacing (`--shell-*`). `fonts.css` — default font families.
- Use the named scales instead of raw values: type `text-display|h1|h2|h3|title|body|body-sm|label|caption`; elevation `shadow-raised|overlay|modal`; motion `duration-fast|base|slow` + `ease-standard|emphasized`; stacking `z-raised|sticky|overlay|toast`. No arbitrary values (`text-[…]`, `z-[…]`, `shadow-[…]`).
- New color tokens must meet WCAG AA in both themes (4.5:1 for text, 3:1 for UI and focus indicators) — check before adding.
- Each hue carries one meaning: `success` = met/good, `warning` = needs attention, `info` = neutral notice, `destructive` = error/danger/not met. `status-recording|paused|uploaded` are aliases used only for recording state — never borrow them to express a meaning.

## Stories

- Every component must have a Storybook story
- Storybook sidebar: **Foundations** documents tokens (colors, typography, spacing; `stories/foundations/`), **UI** the shadcn primitives, **Patterns** the shared components (`stories/patterns/`), then each tool (**SLAI**, **LabWebsite**), and **Preview** (inspiration only) last. Order is set by `storySort` in `.storybook/preview.ts`.
- Stories must show all variants
- Stories must import globals.css via .storybook/preview.ts (already configured)
- Verify with `pnpm check` (what CI runs): Prettier, TypeScript over src/stories/.storybook, ESLint (incl. the `trail/no-raw-colors` and `trail/no-arbitrary-values` token rules), unit tests and every story rendered in Chromium with axe accessibility checks (`a11y.test: "error"`), then the build.
- An accessibility violation fails the build. Fix it; only if the cause is upstream (a shadcn/Radix/cmdk primitive) or a scheduled redesign, disable that single axe rule on that story file with a comment saying why — never switch a story to `todo`/`off`.
- Storybook runs on Vite (`@storybook/react-vite`) and loads one stylesheet, `.storybook/storybook.css`, mirroring `src/tokens/styles.css` — new token files must be added to both.
