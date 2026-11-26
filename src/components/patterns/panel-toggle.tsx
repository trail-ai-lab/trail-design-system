"use client"

import * as React from "react"

import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

const variantClassName = {
  // The page's main panel switch (e.g. "Summary & Q&A"): brand-colored
  // outline, filled while its panel shows.
  primary:
    "border-primary text-primary hover:bg-primary/10 hover:text-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/80",
  outline: "",
} as const

/**
 * A toolbar switch that shows or hides one of the page's panels, e.g.
 * "Summary & Q&A", "Transcript" or "Audio". Put an icon (`data-icon=
 * "inline-start"`) and a short label inside; the label is its accessible
 * name and `aria-pressed` its state. Use `variant="primary"` for the
 * page's most-used panel and `outline` for the rest.
 *
 * Disable the toggle of the last panel still showing, so the page is never
 * empty.
 */
function PanelToggle({
  variant = "outline",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Toggle>, "variant"> & {
  variant?: keyof typeof variantClassName
}) {
  return (
    <Toggle
      data-slot="panel-toggle"
      variant="outline"
      className={cn(variantClassName[variant], className)}
      {...props}
    />
  )
}

export { PanelToggle }
