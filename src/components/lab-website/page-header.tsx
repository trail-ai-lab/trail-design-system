import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/patterns/section-label"

export interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  className?: string
  /** Full-bleed absolute-positioned layer behind the content (e.g. an
   * ambient background illustration). Rendered first, before the content. */
  backdrop?: React.ReactNode
}

/**
 * Generic top banner for secondary pages (Research, Resources, People, ...):
 * eyebrow, title, optional description. For the homepage's banner
 * specifically, use Hero instead.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  backdrop,
}: PageHeaderProps) {
  return (
    <section
      data-slot="page-header"
      className={cn(
        "relative overflow-hidden border-b border-border",
        className
      )}
    >
      {backdrop}
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <SectionLabel asChild>
          <p>{eyebrow}</p>
        </SectionLabel>
        <h1 className="mt-4 max-w-3xl text-h2 text-foreground md:text-display">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
