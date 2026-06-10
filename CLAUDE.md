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

## Token Rules
- All colors must come from CSS variables in src/tokens/globals.css
- Never hardcode hex values, rgba, or hsl values directly in components
- Never modify globals.css directly -- it is generated from the design preset

## Stories
- Every component must have a Storybook story
- Stories must show all variants
- Stories must import globals.css via .storybook/preview.ts (already configured)
