# Trail Design System - Claude Code Rules

## Component Rules
- NEVER use raw Tailwind color classes: bg-blue-500, text-gray-600, border-gray-200
- ALWAYS use semantic classes: bg-primary, text-muted-foreground, border-border
- Layout and spacing classes are fine: p-4, gap-2, flex, grid, w-full
- Check src/components/ui/ before building any new component
- Check src/components/trail/ before building tool-specific components

## New Components
- Shadcn components go in src/components/ui/ (installed via CLI only, never manually)
- Shared Trail components go in src/components/trail/
- Tool-specific components go in src/components/{tool}/
- Every new component must have a corresponding story in stories/{namespace}/

## Prop Naming
- `size` props: draw from Button's canonical scale (`xs | sm | default | lg | icon | icon-xs | icon-sm | icon-lg`, exported as `ButtonSize` from `ui/button.tsx`). Use `Extract<ButtonSize, ...>` for the subset a component needs — never invent a new size name (e.g. `md`).
- `variant` is the standard name for "which visual/structural variant" — not `kind`, `type`, or other synonyms (see `language-chip.tsx`, `resource-card.tsx`).
- lab-website "card" components (`EventCard`, `PersonCard`, `ResearchCard`, `ResourceCard`, `EventDetail`, `PersonProfile`) take a single data-object prop named after the domain it represents (`event`, `person`, `research`, `resource`) — not a generic name like `item` or `data`.
- Every lab-website component accepts and forwards a `className` prop, matching `ui/` and `slai/`.
- "Is this the active one" uses `isActive` for component props (`SidebarMenuButton`, `SidebarMenuSubButton`, `StepNumber`) and `active` for data fields on domain interfaces (`SwitcherGroup.active`, `SidebarPeriod.active`, `TranscriptGroup.active`) that get read into `isActive` at render time. This split is intentional — keep it.
- "An async operation is in flight" uses `loading` (`SummaryCard.loading`, `SessionChatCard.loading`) — not `thinking`, `pending`, or other synonyms.
- Radix `asChild?: boolean` props intersect the shared `AsChildProp` type from `src/lib/types.ts` rather than redeclaring the field inline.
- Overlay `sideOffset` defaults to `4` (Popover, DropdownMenu, Combobox). Tooltip is the one intentional exception, defaulting to `0` — its arrow's position math assumes a flush (zero-gap) relationship with the trigger.

## Token Rules
- All colors must come from CSS variables in src/tokens/globals.css
- Never hardcode hex values, rgba, or hsl values directly in components
- Never modify globals.css directly -- it is generated from the design preset

## Stories
- Every component must have a Storybook story
- Stories must show all variants
- Stories must import globals.css via .storybook/preview.ts (already configured)
