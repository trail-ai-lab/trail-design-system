export interface FooterProps {
  labName?: string
  year?: number
}

export function Footer({ labName = "TRAIL Lab", year = 2026 }: FooterProps) {
  return (
    <footer className="border-t border-border">
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
        <p className="text-xs text-muted-foreground">
          © {year} {labName} · UW–Madison · All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
