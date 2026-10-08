import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import type { AsChildProp } from "@/lib/types"

/**
 * Small uppercase label that titles a section or a group of fields, e.g.
 * "CLASS OVERVIEW" above a card. Renders an `h3` by default; pass `asChild`
 * to put the style on another element (a `p`, `legend`, `dt`, …).
 */
function SectionLabel({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"h3"> & AsChildProp) {
  const Comp = asChild ? Slot.Root : "h3"
  return (
    <Comp
      data-slot="section-label"
      className={cn("text-label text-muted-foreground uppercase", className)}
      {...props}
    />
  )
}

export { SectionLabel }
