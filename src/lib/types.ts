import type { VariantProps } from "class-variance-authority"

import type { buttonVariants } from "@/components/ui/button"

/**
 * Radix-style `asChild`: render the component's styles onto its only child
 * instead of its default element. Intersect this into props rather than
 * redeclaring the field inline.
 */
export type AsChildProp = { asChild?: boolean }

/**
 * Button's canonical size scale. Components with a `size` prop pick a subset
 * with `Extract<ButtonSize, ...>` instead of inventing new size names.
 */
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>
