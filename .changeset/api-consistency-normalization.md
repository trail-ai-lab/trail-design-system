---
"@trail-ai-lab/trail-design-system": minor
---

Normalize component APIs toward Button's canonical patterns (Section 3 of the design
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
