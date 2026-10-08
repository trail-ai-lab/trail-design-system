import { InfoIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Highlighted note for an auto-generated insight. `variant="warning"` flags
 * something needing the teacher's attention (amber); `info` is neutral (blue).
 * Pass `title` for a bolded first line, e.g. a system warning banner.
 */
function InsightCallout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: "info" | "warning"
  title?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const warning = variant === "warning"
  const Icon = warning ? TriangleAlertIcon : InfoIcon
  return (
    <Alert
      className={cn(
        warning
          ? "border-warning/40 bg-warning/10 text-warning"
          : "border-info/40 bg-info/10 text-info",
        className
      )}
    >
      <Icon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className={warning ? "text-warning" : "text-info"}>
        {children}
      </AlertDescription>
    </Alert>
  )
}

export { InsightCallout }
