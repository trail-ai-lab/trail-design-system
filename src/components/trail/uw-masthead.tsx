import { cn } from "@/lib/utils"

export interface UwMastheadProps {
  departmentName?: string
  departmentHref?: string
  className?: string
}

/**
 * University-identity top bar (University of Wisconsin–Madison + department
 * links). Required compliance chrome, shared across every Trail tool site —
 * render above Header, not inside it.
 */
function UwMasthead({
  departmentName = "Department of Educational Psychology",
  departmentHref = "https://edpsych.education.wisc.edu/",
  className,
}: UwMastheadProps) {
  return (
    <div
      role="navigation"
      className={cn(
        "w-full bg-primary px-4 py-1 text-[0.825rem] font-semibold uppercase tracking-wide text-primary-foreground",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-between">
        <a href="https://www.wisc.edu" className="pl-4 hover:underline" aria-label="University home page">
          University of Wisconsin–Madison
        </a>
        <a
          href={departmentHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pr-4 hover:underline"
        >
          {departmentName}
        </a>
      </div>
    </div>
  )
}

export { UwMasthead }
