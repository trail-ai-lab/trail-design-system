import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { ButtonSize } from "@/lib/types"

const iconTileVariants = cva(
  "flex shrink-0 items-center justify-center rounded-lg [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        primary: "bg-primary/10 text-primary",
        destructive: "bg-destructive/10 text-destructive",
        success: "bg-success/10 text-success",
      },
      size: {
        sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
        default: "size-10 [&_svg:not([class*='size-'])]:size-4",
        lg: "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

type IconTileSize = Extract<ButtonSize, "sm" | "default" | "lg">

/**
 * Rounded square holding a single icon — the leading media for list rows,
 * activity logs and feature tiles. Matches the preview blocks' muted tile.
 * Empty states should use `EmptyMedia variant="icon"` instead.
 */
function IconTile({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<"div"> &
  Omit<VariantProps<typeof iconTileVariants>, "size"> & {
    size?: IconTileSize
  }) {
  return (
    <div
      data-slot="icon-tile"
      aria-hidden
      className={cn(iconTileVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { IconTile, iconTileVariants }
