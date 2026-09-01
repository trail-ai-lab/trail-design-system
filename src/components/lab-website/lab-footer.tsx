import { cn } from "@/lib/utils"
import { Logo } from "@/components/trail"
import { UwCrest } from "./uw-crest"

export interface LabFooterContactLink {
  icon: React.ReactNode
  label: string
  href: string
}

export interface LabFooterAffiliation {
  label: string
  href: string
}

export interface LabFooterProps {
  labName?: string
  year?: number
  address?: string[]
  email?: string
  mapLink?: string
  contactLinks?: LabFooterContactLink[]
  affiliations?: LabFooterAffiliation[]
  feedbackEmail?: string
  className?: string
  /** Full-bleed absolute-positioned layer behind the content (e.g. a
   * decorative illustration). Rendered first, before the content. */
  backdrop?: React.ReactNode
}

/**
 * Site-wide footer: UW crest, contact details, affiliations, and a closing
 * copyright line. The crest doubles as the lab's identity mark, so it isn't
 * paired with a wordmark. Rendered once per page, at the very end.
 */
export function LabFooter({
  labName = "TRAIL Lab",
  year = 2026,
  address,
  email,
  mapLink,
  contactLinks,
  affiliations,
  feedbackEmail,
  className,
  backdrop,
}: LabFooterProps) {
  const hasContact = Boolean(address?.length || email || contactLinks?.length)
  const hasAffiliations = Boolean(affiliations?.length)

  return (
    <section className={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)}>
      {backdrop}
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-5">
            {/* Inner wrapper shrinks to its widest child (the line of text), so
                items-center centers the narrower crest over that text while the
                group as a whole stays flush left in the column. */}
            <div className="flex flex-col items-center gap-4">
              <a href="https://www.wisc.edu" aria-label="University of Wisconsin–Madison" className="text-foreground hover:text-primary">
                <UwCrest className="h-28 w-auto" />
              </a>
              <a href="https://www.wisconsin.edu" className="text-sm text-muted-foreground hover:text-foreground">
                Part of the Universities of Wisconsin
              </a>
            </div>
          </div>

          {hasContact ? (
            <div className="lg:col-span-3">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</h3>
              <address className="mt-5 text-[0.95rem] not-italic leading-relaxed text-foreground">
                {address?.map((line) => <p key={line}>{line}</p>)}
                {email ? (
                  <p className="mt-3">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-from-font underline-offset-[5px] decoration-border transition-colors hover:decoration-foreground"
                    >
                      {email}
                    </a>
                  </p>
                ) : null}
                {mapLink ? (
                  <p className="mt-2">
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline decoration-from-font underline-offset-[3px] hover:text-foreground"
                    >
                      View on Google Maps →
                    </a>
                  </p>
                ) : null}
              </address>

              {contactLinks && contactLinks.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {hasAffiliations ? (
            <div className="lg:col-span-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Affiliations</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {affiliations?.map((affiliation) => (
                  <li key={affiliation.label}>
                    <a
                      href={affiliation.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-2 text-foreground"
                    >
                      <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                        ↗
                      </span>
                      <span className="underline decoration-border decoration-from-font underline-offset-[5px] transition-colors group-hover:decoration-foreground">
                        {affiliation.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-[0.825rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          {feedbackEmail ? (
            <p className="font-mono">
              Feedback or accessibility issues?{" "}
              <a
                href={`mailto:${feedbackEmail}`}
                className="text-foreground underline decoration-from-font underline-offset-[3px] hover:decoration-2"
              >
                {feedbackEmail}
              </a>
            </p>
          ) : (
            <span />
          )}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Logo className="h-3.5 text-muted-foreground" />© {year} {labName} · UW–Madison · All
            Rights Reserved
          </p>
        </div>
      </div>
    </section>
  )
}
