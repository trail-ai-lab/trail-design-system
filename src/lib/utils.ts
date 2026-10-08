import type { CnFunction } from "cn"
import { createCn } from "cn/config"

/**
 * Joins class names (like clsx) and resolves Tailwind conflicts (like
 * tailwind-merge), via shadcn's `cn` engine. Extended with Trail's named scales
 * (src/tokens/scales.css, semantic.css) so e.g. `cn("text-h1", "text-sm")`
 * keeps only the last size and `text-label` isn't mistaken for a text color.
 *
 * Every component, including the shadcn primitives in ui/, imports `cn` from
 * here so this configuration always applies.
 */
export const cn: CnFunction = createCn({
  extend: {
    theme: {
      text: [
        "hero",
        "display",
        "h1",
        "h2",
        "h3",
        "title",
        "body",
        "body-sm",
        "label",
        "caption",
      ],
      shadow: ["raised", "overlay", "modal"],
      radius: ["card"],
      ease: ["standard", "emphasized"],
    },
    classGroups: {
      duration: [{ duration: ["fast", "base", "slow"] }],
      z: [{ z: ["raised", "sticky", "overlay", "toast"] }],
    },
  },
})
