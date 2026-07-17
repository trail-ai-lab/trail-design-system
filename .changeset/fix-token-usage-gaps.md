---
"@trail/ui": patch
---

Fix invalid `hsl(var(--sidebar-border))` shadow (oklch wrapped in `hsl()` was silently
dropped by the browser) and replace raw-color/arbitrary-value patterns with semantic
tokens: `Slider` thumb now uses `bg-background`/`ring-foreground` instead of
`bg-white`/`ring-black`; new `--overlay`, `--radius-card`, and `--radius-xs` tokens
replace repeated `bg-black/30` and `rounded-[...]` arbitrary values in
`AlertDialog`/`Dialog`/`Sheet`/`Card`/`Chart`/`Tooltip`; `Sidebar`'s width constants
moved from JS into `--shell-sidebar-*` tokens in `layout.css`.
