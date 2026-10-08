import { cn } from "@/lib/utils"

/**
 * Makes a whole `Card` clickable: an invisible link stretched over the card,
 * with a visible focus ring for keyboard users. Put it first inside a
 * `relative` Card; interactive children that must stay clickable need
 * `relative z-10`.
 */
function CardLink({
  href,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "children"> & {
  href: string
  /** Accessible name for the link, usually the card's title */
  label: string
}) {
  return (
    <a
      data-slot="card-link"
      href={href}
      aria-label={label}
      className={cn(
        "absolute inset-0 rounded-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

export { CardLink }
