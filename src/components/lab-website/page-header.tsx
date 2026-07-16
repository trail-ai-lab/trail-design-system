export interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-3xl tracking-tight text-foreground md:text-5xl">
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
