import { cn } from "@/lib/utils"

export interface ResearchIntroFaq {
  question: string
  answer: string
}

export interface ResearchIntroProps {
  eyebrow: string
  title: React.ReactNode
  description: string
  faqs: ResearchIntroFaq[]
  className?: string
}

/**
 * Research page's opening section — a mission statement paired with a
 * numbered FAQ list, split two-up. Presentational only; for the research
 * area card grid below it, use ResearchCard.
 */
export function ResearchIntro({ eyebrow, title, description, faqs, className }: ResearchIntroProps) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-3xl tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <ol className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            {faqs.map((faq, index) => (
              <li key={index} className="grid grid-cols-[2.5rem_1fr] gap-4 border-l border-border pl-5">
                <span className="pt-1 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl tracking-tight text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
