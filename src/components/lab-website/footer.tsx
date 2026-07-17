import { cn } from "@/lib/utils"
import { Logo } from "@/components/trail"

export interface FooterProps {
  labName?: string
  year?: number
  className?: string
}

/**
 * Site-wide footer with UW–Madison affiliation links and copyright.
 * Rendered once per page, typically paired with Header at the very end.
 */
export function Footer({ labName = "TRAIL Lab", year = 2026, className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex flex-col gap-1">
          <a href="https://www.wisc.edu" className="text-sm font-medium text-foreground hover:text-primary">
            University of Wisconsin–Madison
          </a>
          <a
            href="https://www.wisconsin.edu"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Part of the Universities of Wisconsin
          </a>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Logo className="h-3.5 text-muted-foreground" />
          © {year} {labName} · UW–Madison · All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
